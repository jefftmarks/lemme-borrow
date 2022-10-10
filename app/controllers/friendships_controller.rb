class FriendshipsController < ApplicationController
	before_action :set_friendship, only: [:show, :destroy]

	def create
		friendship_one = Friendship.create!(friendship_params)
		# Create a second friendship with reverse attributes and link to first friendship
		friendship_two = Friendship.create!(
			user_id: friendship_params[:friend_id],
			friend_id: friendship_params[:user_id],
			corresponding_friendship_id: friendship_one.id
		)
		# Link first friendship to second
		friendship_one.update!(corresponding_friendship_id: friendship_two.id)
		render json: friendship_one, status: :created
	end

	def show
		render json: @friendship_one, status: :ok
	end

	def destroy
		# Delete corresponding friendship
		@friendship_one.corresponding_friendship.destroy
		@friendship_one.destroy
		render json: @friendship_one
	end

	private

	def friendship_params
		params.permit(:user_id, :friend_id, :corresponding_friendship_id)
	end

	def set_friendship
		@friendship_one = Friendship.find_by(user_id: params[:user_id], friend_id: params[:friend_id])
	end
end
