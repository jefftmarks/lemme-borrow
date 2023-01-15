require 'faker'

class Api::UsersController < ApplicationController
	before_action :set_user, only: [:show, :update, :destroy]

	def index
		@users = User.all
		render json: @users
	end

	def show
		render json: @user
	end

	def update
		# Authenticate user based on current password
		if @user.authenticate(password_params[:current_password])
			# If new password present, update all of user attributes
			if password_params[:new_password]
				@user.update!(user_params)
			else
				# If no new password, only update certain attributes
				@user.update!(
					first_name: user_params[:first_name],
					last_name: user_params[:last_name],
					username: user_params[:username],
					avatar: user_params[:avatar],
				)
			end
			render json: @user, status: :accepted
		else
			render json: { error: "invalid username or password" }, status: :unauthorized
		end
	end

	def destroy
		@user.destroy
		head :no_content
	end

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
			render json: { error: "invalid username or password" }, status: :unauthorized
		end
	end

	def profile
		token = request.headers["token"]
		user_id = decode_token(token)
		if user_id
			user = User.find(user_id)
			render json: user
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

	def password_params
		params.permit(:current_password, :new_password)
	end

end
