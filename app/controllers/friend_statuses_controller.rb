class FriendStatusesController < ApplicationController

	def status
		# Check whether or not friends. Send back message depending on whether 1. they haven't responded to your friend request or 2. you haven't responded to them
		user = User.find(status_params[:user_id])
		friend = User.find(status_params[:friend_id])
		# You've already requested friend but they haven't responded
		requesting_friendship = FriendRequest.find_by(requester: user, receiver: friend)
		# Friend has already requested you but you haven't responded
		requested_friendship = FriendRequest.find_by(requester: friend, receiver: user)
		
		# Render Friendship or FriendRequest instance when relevant so that action can be easily taken on front end (e.g. to delete friendship or accept/decline friend request)
		if user.is_friends_with?(friend)
			friendship = Friendship.find_by(user: user, friend: friend)
			render json: { status: "Friends", data: FriendshipSerializer.new(friendship) }
		elsif requesting_friendship
			render json: { status: "Pending Response" }
		elsif requested_friendship
			render json: { status: "Pending Action", data: FriendRequestSerializer.new(requested_friendship) }
		else
			render json: { status: "Not Friends" }
		end
	end

	private

	def status_params
		params.permit(:user_id, :friend_id)
	end
end
