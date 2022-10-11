class FriendRequestsController < ApplicationController
	before_action :set_friend_request, only: [:destroy]

	def create
		# Grab users included in request
		requester = User.find(request_params[:requester_id])
		receiver = User.find(request_params[:receiver_id])

		# If friend request (in reverse direction) already exists, throw error
		inverse_request = FriendRequest.find_by(requester: receiver, receiver: requester)

		# Prevent from requesting someone who is already your friend
		if requester.is_friends_with?(receiver)
			render json: { error: "You're already friends" }
		elsif inverse_request
			render json: { error: "Please respond to #{receiver.first_name}'s friend request" }
		# You can't friend request yourself... throw error
		elsif requester.id === receiver.id
			render json: { error: "You can't request yourself" }
		else
			friend_request = FriendRequest.create!(request_params)
			render json: friend_request, status: :created
		end
	end

	# Get all of user's pending requests
	def my_requests
		user = User.find(request_params[:user_id])
		requests = user.incoming_friend_requests
		render json: requests, status: :ok
	end

	# Friend request declined
	def destroy
		@friend_request.destroy
		render json: @friend_request
	end

	private

	def request_params
		params.permit(:requester_id, :receiver_id, :user_id)
	end

	def set_friend_request
		@friend_request = FriendRequest.find(params[:id])
	end
end
