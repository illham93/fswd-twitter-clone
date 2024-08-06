module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save

        # Create a session for the new user
        sessions_controller = Api::SessionsController.new
        sessions_controller.request = request
        sessions_controller.response = response
        sessions_controller.params = {
          user: {
            username: @user.username,
            password: params[:user][:password]
          }
        }

        sessions_controller.create
        render json: {
          success: true,
          message: 'User successfully created'
        }, status: :created
      else
        render json: {
          success: false,
          errors: @user.errors.full_messages
        }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
  end
end
