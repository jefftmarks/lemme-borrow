Rails.application.routes.draw do

  resources :friend_requests, only: [:create]
  resources :friendships, only: [:create]
  resources :users, only: [:index, :create, :show, :destroy]

	# Auth
	post "/login", to: "users#login"
  get "/profile", to: "users#profile"

	# Friendships
	get "/friendships/user/:user_id/friend/:friend_id", to: "friendships#friend_status"
	delete "/friendships/user/:user_id/friend/:friend_id", to: "friendships#destroy"
	# Friend Requests
	get "/friend_requests/:user_id", to: "friend_requests#all_requests"


end
