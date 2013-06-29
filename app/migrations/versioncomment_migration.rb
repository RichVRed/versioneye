class VersioncommentMigration

  def self.set_languages
    Versioncomment.where(:product_key => /^php\//i).update_all(        language: Product::A_LANGUAGE_PHP    )
    Versioncomment.where(:product_key => /^Python\//i).update_all(     language: Product::A_LANGUAGE_PYTHON )
    Versioncomment.where(:product_key => /^pip\//i).update_all(        language: Product::A_LANGUAGE_PYTHON )
    Versioncomment.where(:product_key => /^Node\//i).update_all(       language: Product::A_LANGUAGE_NODEJS )
    Versioncomment.where(:product_key => /^npm\//i).update_all(        language: Product::A_LANGUAGE_NODEJS )
    Versioncomment.where(:product_key => /^R\//i).update_all(          language: Product::A_LANGUAGE_R )
    Versioncomment.where(:product_key => /^JavaScript\//i).update_all( language: Product::A_LANGUAGE_JAVASCRIPT )
    Versioncomment.where(:product_key => /^Clojure\//i).update_all(    language: Product::A_LANGUAGE_CLOJURE )
    Versioncomment.where(:product_key => /^[a-z]+\.[a-z\.]+\/[a-z]+/i).update_all( language: Product::A_LANGUAGE_JAVA )
  end

  def self.set_languages_slow
    comments = Versioncomment.where(:language => nil)
    comments.each do |comment|
      product = Product.find_by_key( comment.product_key )
      if product.nil?
        comment.remove
        p "remove comment : #{comment.product_key} - #{comment.name}"
      else
        comment.language = product.language
        comment.save
      end
    end
  end

  def self.update_php_prod_keys
    elements = Versioncomment.where(:prod_key => /^php\//i)
    elements.each do |element|
      element.prod_key = element.prod_key.gsub("php\/", "")
      element.save
    end
  end

end
