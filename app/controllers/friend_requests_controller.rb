class FriendRequestsController < ApplicationController
	def create
		friend_request = FriendRequest.create!(friend_request_params)
		render json: friend_request, status: :created
	end

	# Get all of user's pending requests
	def all_requests
		requests = FriendRequest.where(receiver_id: params[:user_id])
		render json: requests, status: :ok
	end

	private

	def friend_request_params
		params.permit(:requester_id, :receiver_id)
	end
end
