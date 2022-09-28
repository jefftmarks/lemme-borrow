class UsersController < ApplicationController
	before_action :set_user, only: [:show, :destroy]

	def index
		@users = User.all
		render json: @users, status: :ok
	end

	def show
		render json: @user, status: :accepted
	end

	def create
		user = User.create!(user_params)
		token = generate_token(user.id)
		render json: { user: UserSerializer.new(user), token: token }, status: :created
	end

	def destroy
		@user.destroy
		head :no_content
	end

	def login
		user = User.find_by(username: params[:username])
		if user&.authenticate(params[:password])
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
		params.permit(:username, :password, :password_confirmation)
	end
end
