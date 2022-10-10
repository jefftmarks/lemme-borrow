class FriendshipsController < ApplicationController
	before_action :set_friendship, only: [:friend_status, :destroy]

	# For when a user clicks ACCEPT on a friend request, create new friendship
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

		# Destroy corresponding friend request
		friend_request = FriendRequest.find_by(
			receiver_id: friendship_params[:user_id],
			requester_id: friendship_params[:friend_id]
		)
		friend_request.destroy

		# Render JSON
		render json: {created: FriendshipSerializer.new(friendship_one), destroyed: FriendRequestSerializer.new(friend_request) }, status: :created
	end

	def friend_status
		# Send back message depending on whether 1. they haven't responded to your friend request or 2. you haven't responded to them
		# Check whether or not friends
		if FriendRequest.find_by(requester: params[:user_id], receiver: params[:friend_id])
			render json: { message: "Pending Them" }
		elsif FriendRequest.find_by(requester: params[:friend_id], receiver: params[:user_id])
			render json: { message: "Pending You" }
		elsif @friendship
			render json: { message: "Friends" }
		else
			render json: { message: "Not Friends" }
		end
	end

	def destroy
		# Delete corresponding friendship
		@friendship.corresponding_friendship.destroy
		@friendship.destroy
		render json: @friendship
	end

	private

	def friendship_params
		params.permit(:user_id, :friend_id, :corresponding_friendship_id)
	end

	def set_friendship
		@friendship = Friendship.find_by(user_id: params[:user_id], friend_id: params[:friend_id])
	end
end
