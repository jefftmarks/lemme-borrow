class FriendStatusesController < ApplicationController

	# Check whether or not friends. Send back message depending on whether 1. they haven't responded to your friend request or 2. you haven't responded to them

	def status
		user = User.find(status_params[:user_id])
		friend = User.find(status_params[:friend_id])

		# Determine whether friends
		friendship = Friendship.find_by(user: user, friend: friend)
		
		# Check friend status and return a boolean plus status to trigger actions on front end plus return instance of the friend for rendering on front end
		if friendship
			render json: { status: { is_friends: friendship.id, mode: "Friends" }, user: UserSerializer.new(friend) }
		# You've already requested friend but they haven't responded
		elsif FriendRequest.find_by(requester: user, receiver: friend)
			render json: { status: { is_friends: false, mode: "Pending Response" }, user: UserSerializer.new(friend) }
		# Friend has already requested you but you haven't responded
		elsif FriendRequest.find_by(requester: friend, receiver: user)
			render json: { status: { is_friends: false, mode: "Pending Action" }, user: UserSerializer.new(friend) }
		else
			render json: { status: { is_friends: false, mode: "Not Friends" }, user: UserSerializer.new(friend) }
		end
	end

	private

	def status_params
		params.permit(:user_id, :friend_id)
	end
end
