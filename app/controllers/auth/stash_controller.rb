class Auth::StashController < ApplicationController

  before_action :set_locale
  before_action :enterprise_activated?


  def signin
    if signed_in?
      flash[:error] = "You are already signed in. If you want to connect with Stash, check your settings!"
      redirect_to settings_connect_path and return
    end
    connect_with_stash
  end


  def connect
    if not signed_in?
      flash[:error] = "You have to sign in to be able to connect your Stash account with your VersionEye account."
      redirect_to signin_path and return
    end
    connect_with_stash
  end


  def callback
    unless session.has_key?(:request_token)
      flash[:error] = 'An error occured. Please try again and contact the VersionEye team.'
      session.clear
      redirect_to signin_path and return
    end

    init_request_token
    access_token = fetch_access_token params[:oauth_verifier], params[:oauth_token]
    user_info = Stash.user(access_token.token, access_token.secret)

    if signed_in?
      connect_stash_with_user user_info, access_token
      redirect_to settings_connect_path and return
    end

    user = User.find_by_stash_slug(user_info[:slug])
    if user.nil?
      user = User.find_by_email( user_info[:emailAddress] )
    end
    if user.nil?
      user = create_new_user user_info, access_token
      if !user.save
        flash[:error] = "An error occured (#{user.errors.full_messages.to_sentence}). Please contact the VersionEye Team."
        Rails.logger.error "ERROR in StashController.callback: (#{user.errors.full_messages.to_sentence}). user_info: #{user_info}"
        redirect_to signin_path and return
      end
    end

    if user.nil?
      flash[:error] = "An error occured. Please contact the VersionEye Team."
      rpath = signin_path
    else
      sign_in user
      rpath = get_redirect_path( user )
    end
    redirect_back_or rpath and return
  end

  private

    def get_redirect_path user
      if Settings.instance.orga_creation_admin_only == true && user.admin == false
        return notifications_path
      else
        orga = get_orga_for_login( user )
        return notifications_path if orga.nil?

        rpath = user_projects_stash_repositories_path
        rpath = projects_organisation_path( orga ) if orga.projects && !orga.projects.empty?
        return rpath
      end
    end

    def init_request_token
      @consumer = Stash.init_oauth_client
      @request_token = OAuth::RequestToken.new(@consumer, session[:request_token], session[:request_token_secret])
    end

    def connect_with_stash
      callback_url  = auth_stash_callback_url
      request_token = Stash.request_token( callback_url )

      session[:request_token] = request_token.token
      session[:request_token_secret] = request_token.secret

      redirect_to request_token.authorize_url(oauth_callback: callback_url)
    end

    def fetch_access_token oauth_verifier, oauth_token
      access_token = @request_token.get_access_token(
        oauth_consumer_key: Stash.consumer_key,
        oauth_verifier: oauth_verifier,
        oauth_token: oauth_token
      )
    end

    def connect_stash_with_user user_info, access_token
      update_user_with user_info, access_token
      if current_user.save
        flash[:success] = 'Your account is now connected to Stash.'
      else
        error_msg = "An error occured. Cant attach profile updates from Stash. Please contact the VersionEye team."
        Rails.logger.error "#{error_msg} Data: #{current_user.errors.full_messages.to_sentence}"
        flash[:error] = error_msg
      end
    end

    def create_new_user user_info, access_token
      user = User.new
      user.update_from_stash_json( user_info, access_token.token, access_token.secret )
      user
    end

    def update_user_with user_info, access_token
      current_user[:stash_slug]   = user_info[:slug]
      current_user[:stash_token]  = access_token.token
      current_user[:stash_secret] = access_token.secret
    end

end
