class Project

  include Mongoid::Document
  include Mongoid::Timestamps

  field :user_id, type: String
  field :name, type: String
    
  field :project_type, type: String, :default => "Maven2"
  field :url, type: String
  field :s3, type: Boolean
  field :s3_filename, type: String
  field :dep_number, type: Integer
  field :out_number, type: Integer, default: 0
  
  attr_accessor :dependencies
  
  def self.find_by_id id
    Project.first(conditions: { id: id} )
  end
  
  def self.find_by_user user_id
    Project.all(conditions: { user_id: user_id } )
  end

  def fetch_dependencies
    self.dependencies = Projectdependency.all(conditions: {project_id: self.id} ).desc(:outdated).asc(:prod_key)
    self.dependencies
  end
  
  def self.create_from_file(project_type, url)
    project = nil
    if project_type.eql?("Maven2")
      project = Project.create_from_pom_url ( url )
    elsif project_type.eql?("RubyGems")
      project = Project.create_from_gemfile_url ( url )
    elsif project_type.eql?("PIP")
      project = Project.create_from_pip_url ( url )
    end
    project
  end
  
  def self.create_from_pom_url url
    return nil if url.nil?
    doc = Nokogiri::HTML(open(url))
    return nil if doc.nil?
      
    project = Project.new
    project.dependencies = Array.new
    
    properties = Hash.new
    doc.xpath('//project/properties').each do |node|
      node.children.each do |child|
          properties[child.name] = child.text.strip
      end  
    end
    
    doc.xpath('//project/dependencies/dependency').each do |node|
      dependency = Projectdependency.new
      
      node.children.each do |child|  
        if child.name.casecmp("groupId") == 0
          dependency.group_id = child.text.strip 
        elsif child.name.casecmp("artifactId") == 0
          dependency.artifact_id = child.text.strip
        elsif child.name.casecmp("version") == 0
          dependency.version = Project.get_variable_value_from_pom properties, child.text.strip 
        elsif child.name.casecmp("scope") == 0
          dependency.scope = child.text.strip
        end
      end
      dependency.name = dependency.artifact_id
      if dependency.scope.nil? 
        dependency.scope = "compile"
      end
      
      product = Product.find_by_group_and_artifact(dependency.group_id, dependency.artifact_id)
      if !product.nil?
        dependency.prod_key = product.prod_key
      end
      
      dependency.update_outdated
      if dependency.outdated?
        project.out_number = project.out_number + 1
      end
      
      project.dependencies << dependency
    end
    
    project.dep_number = project.dependencies.count
    project
  end
  
  def self.create_from_pip_url(url)
    return nil if url.nil?
    uri = URI(url)
    txt = Net::HTTP.get(uri)
    return nil if txt.nil?
    
    project = Project.new
    project.dependencies = Array.new
    
    txt.each_line do |line|

      if !line.match(/^#/).nil?
        next
      end

      splitter = "=="
      if !line.match(/>=/).nil?
        splitter = ">="
      elsif !line.match(/>/).nil?
        splitter = ">"  
      end
      requirement = line.split(splitter)
      
      if requirement.empty? || requirement.count != 2
        next
      end
      
      package = requirement[0]
      
      if package.strip.empty? 
        next
      end
      
      dependency = Projectdependency.new
      dependency.name = package
      dependency.comperator = splitter
      dependency.scope = "compile"
      
      version = requirement[1]
      dependency.version = version.strip
      
      product = Product.find_by_key("pip/#{package}")
      if product.nil? 
        product = Product.find_by_key_case_insensitiv("pip/#{package}")
      end
      if !product.nil?
        dependency.prod_key = product.prod_key
      end
      dependency.update_outdated
      if dependency.outdated?
        project.out_number = project.out_number + 1
      end      
      project.dependencies << dependency
    end
    project.dep_number = project.dependencies.count
    project
  end
  
  def self.create_from_gemfile_url ( url )
    return nil if url.nil?    
    if url.match(/^https:\/\/github.com\//)
      url = url.gsub("https://github.com", "https://raw.github.com")
      url = url.gsub("/blob/", "/")
    end
    uri = URI.parse( url )
    http = Net::HTTP.new(uri.host, uri.port)
    if uri.port == 443
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    end        
    request = Net::HTTP::Get.new(uri.request_uri)
    gemfile = http.request(request).body
    return nil if gemfile.nil?
    
    project = Project.new
    project.dependencies = Array.new
    
    gemfile.each_line do |line|
      # if it starts not with gem skip the line
      line = line.strip
      if line.match(/^gem/).nil?
        next
      end
      line = line.gsub("gem ", "")
      line_elements = line.split(",")
      package = line_elements[0].strip
      package = package.gsub('"', '')
      package = package.gsub("'", "")
      
      dependency = Projectdependency.new
      dependency.name = package
      
      product = Product.find_by_key(package)
      if !product.nil?
        dependency.prod_key = product.prod_key
      end
      
      update_version_from_gemfile(line_elements, dependency, product)
      
      dependency.update_outdated
      if dependency.outdated?
        project.out_number = project.out_number + 1
      end      
      project.dependencies << dependency
    end
    project.dep_number = project.dependencies.count
    project
  end
  
  def self.get_variable_value_from_pom( properties, val )
    if val.include?("${") && val.include?("}")
      new_val = String.new(val)
      new_val.gsub!("${", "")
      new_val.gsub!("}", "")
      new_val.downcase!
      value = properties[new_val]
      return val if value.nil? || value.empty?
      return value 
    else 
      return val  
    end
  end
  
  def self.update_version_from_gemfile(line_elements, dependency, product)
    version = line_elements[1]
    if (version.nil?)
      update_dep_version_with_product(dependency, product)
      return 
    end
    version = version.strip
    version = version.gsub('"', '')
    version = version.gsub("'", "")
    if version.match(/^:require/)
      update_dep_version_with_product(dependency, product)
    elsif version.match(/^>/)
      update_dep_version_with_product(dependency, product)
    elsif version.match(/^http/)
      dependency.version = "UNKNOWN"
    elsif version.match(/^~>/)
      ver = version.gsub("~>", "")
      ver = ver.gsub(" ", "")
      dependency.version = ver
      dependency.comperator = "~>"
    else
      dependency.version = version
      dependency.comperator = "="
    end
  end
  
  private 
  
    def self.update_dep_version_with_product( dependency, product )
      if !product.nil?
        dependency.version = product.version
      else
        dependency.version = "UNKNOWN"
      end
      dependency
    end
  
end