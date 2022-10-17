Rails.application.routes.draw do

  resources :messages, only: [:create]
  resources :users, only: [:index, :create, :show, :update, :destroy]
  resources :friend_requests, only: [:create, :destroy]
  resources :friendships, only: [:create, :destroy]
	resources :items, only: [:index, :show, :update, :create, :destroy]
	resources :tags, only: [:index]
	resources :tickets, only: [:create, :show]

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
	patch "/items/:id/user/:user_id/to/:new_owner_id", to: "items#gift_item"

	# Tickets
	patch "/tickets/close/:id/user/:user_id", to: "tickets#close"
	get "/tickets/requests/:user_id", to: "tickets#my_requests"
	patch "/tickets/approve/:id", to: "tickets#approve"
	patch "/tickets/date/:id", to: "tickets#set_return_date"
	patch "/tickets/offer/:id", to: "tickets#offer_gift"
	patch "/tickets/decline_gift/:id", to: "tickets#decline_gift"
	patch "/tickets/accept_gift/:id", to: "tickets#accept_gift"
	patch "/tickets/complete/:id", to: "tickets#complete"
	patch "/tickets/receive/:id", to: "tickets#receive_item"
	get "/tickets/loans/:user_id", to: "tickets#active_loans"
	get "/tickets/borrows/:user_id", to: "tickets#active_borrows"

	# Pending Tickets - Custom Controller
	get "/pending_tickets/item/:item_id/user/:user_id", to: "pending_tickets#show"

	# Messages
	get "/messages/ticket/:ticket_id", to: "messages#ticket_messages"
 
end
