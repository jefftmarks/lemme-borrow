class FriendshipsController < ApplicationController
	before_action :set_friendship, only: [:friend_status, :destroy]

	# For when a user clicks ACCEPT on a friend request, create new friendship
	def create
		user = User.find(friendship_params[:user_id])
		friend = User.find(friendship_params[:friend_id])

		# can't be friends with yourself
		if user.id == friend.id
			render json: { error: "You can't be friends with yourself" }
		else
			friendship_one = Friendship.create!(friendship_params)
			# Create a second friendship with reverse attributes and link to first friendship
			friendship_two = Friendship.create!(
				user: friend,
				friend: user,
				corresponding_friendship: friendship_one
			)
			# Link first friendship to second
			friendship_one.update!(corresponding_friendship: friendship_two)

			# Destroy corresponding friend request
			friend_request = FriendRequest.find_by(receiver: user, requester: friend)
			friend_request.destroy

			# Render JSON
			render json: { created: FriendshipSerializer.new(friendship_one), destroyed: FriendRequestSerializer.new(friend_request) }, status: :created
		end
	end

	def my_friends
		user = User.find(friendship_params[:user_id])
		render json: user.friends
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
		@friendship = Friendship.find(params[:id])
	end
end
