require 'faker'

class UsersController < ApplicationController
	before_action :set_user, only: [:show, :destroy]

	def index
		@users = User.all
		render json: @users, status: :ok
	end

	def show
		render json: @user, serializer: UserWithFullDetailsSerializer, status: :accepted
	end

	def destroy
		@user.destroy
		head :no_content
	end

	# For signup
	def create
		user = User.create!(**user_params, avatar: Faker::Avatar.image)
		token = generate_token(user.id)
		render json: { user: UserSerializer.new(user), token: token }, status: :created
	end

	def login
		user = User.find_by(username: user_params[:username])
		if user&.authenticate(user_params[:password])
			token = generate_token(user.id)
			render json: { user: UserSerializer.new(user), token: token }, status: :created
		else
			render json: { error: "Invalid username or password" }, status: :unauthorized
		end
	end

	def profile
		token = request.headers["token"]
		user_id = decode_token(token)
		if user_id
			render json: User.find(user_id)
		else
			render json: { error: "Unauthorized" }, status: :unauthorized
		end
	end

	private

	def set_user
		@user = User.find(params[:id])
	end

	def user_params
		params.permit(:first_name, :last_name, :email, :username, :avatar, :password, :password_confirmation)
	end
end
