Rails.application.routes.draw do

  resources :users, only: [:index, :create, :show, :destroy]

	post "/login", to: "users#login"
  get "/profile", to: "users#profile"

end
