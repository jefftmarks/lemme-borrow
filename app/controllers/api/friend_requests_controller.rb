class Api::FriendRequestsController < ApplicationController
	before_action :set_friend_request, only: [:destroy]

	def create
		friend_request = FriendRequest.create!(request_params)
		render json: { is_friends: false, mode: "Pending Response" }, status: :created
	end

	# Get all of user's pending requests
	def my_requests
		user = User.find(user_params[:user_id])
		requests = user.incoming_friend_requests
		render json: requests.sort_by { |request| request[:created_at] }.reverse!
	end

	# Friend request declined
	def destroy
		@friend_request.destroy
		render json: @friend_request
	end

	private

	def request_params
		params.permit(:requester_id, :receiver_id)
	end

	def user_params
		params.permit(:user_id)
	end

	def set_friend_request
		@friend_request = FriendRequest.find(params[:id])
	end
end
