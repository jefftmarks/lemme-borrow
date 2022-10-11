Rails.application.routes.draw do

  # resources :clothes_infos
  # resources :book_infos
  resources :items, only: [:index, :show, :update, :create, :destroy]
  resources :friend_requests, only: [:create, :destroy]
  resources :friendships, only: [:create]
  resources :users, only: [:index, :create, :show, :destroy]

	# Auth
	post "/login", to: "users#login"
  get "/profile", to: "users#profile"

	# Friendships
	get "/friendships/user/:user_id/friend/:friend_id", to: "friendships#friend_status"
	delete "/friendships/user/:user_id/friend/:friend_id", to: "friendships#destroy"
	# Friend Requests
	get "/friend_requests/user/:user_id", to: "friend_requests#my_requests"

	# Items
	get "/items/user/:user_id", to: "items#my_items"
	get "/items/recent", to: "items#recently_uploaded"

end
