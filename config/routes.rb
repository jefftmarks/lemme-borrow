Rails.application.routes.draw do

  resources :messages, only: [:create]
  resources :users, only: [:index, :create, :show, :destroy]
  resources :friend_requests, only: [:create, :destroy]
  resources :friendships, only: [:create, :destroy]
	resources :items, only: [:index, :show, :update, :create, :destroy]
	resources :tags, only: [:index]
	resources :tickets, only: [:create, :show, :update, :destroy]

	# Auth
	post "/login", to: "users#login"
  get "/profile", to: "users#profile"

	# Friend Statuses - Custom Controller
	get "/friend_statuses/user/:user_id/friend/:friend_id", to: "friend_statuses#status"

	# Friend Requests
	get "/friend_requests/user/:user_id", to: "friend_requests#my_requests"

	# Friendships
	get "/friendships/user/:user_id", to: "friendships#my_friends"
	# delete "/friendships/user/:user_id/friend/:friend_id", to: "friendships#destroy"

	# Items
	get "/items/belongings/:user_id", to: "items#my_belongings"
	get "/items/recent/:user_id/count/:count", to: "items#recently_uploaded"

	# Tickets
	get "/tickets/user/:user_id", to: "tickets#my_tickets"
 
end
