class FriendRequestsController < ApplicationController
	before_action :set_friend_request, only: [:destroy]

	def create
		friend_request = FriendRequest.create!(friend_request_params)
		render json: friend_request, status: :created
	end

	# Get all of user's pending requests
	def my_requests
		requests = FriendRequest.where(receiver_id: params[:user_id])
		render json: requests, status: :ok
	end

	# Friend request declined
	def destroy
		@friend_request.destroy
		render json: @friend_request
	end

	private

	def friend_request_params
		params.permit(:requester_id, :receiver_id)
	end

	def set_friend_request
		@friend_request = FriendRequest.find(params[:id])
	end
end
