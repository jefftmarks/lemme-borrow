Rails.application.routes.draw do

  resources :friendships, only: [:create]
  resources :users, only: [:index, :create, :show, :destroy]

	# Auth
	post "/login", to: "users#login"
  get "/profile", to: "users#profile"

	# Friendships
	get "/friendships/user/:user_id/friend/:friend_id", to: "friendships#show"
	delete "/friendships/user/:user_id/friend/:friend_id", to: "friendships#destroy"

end
