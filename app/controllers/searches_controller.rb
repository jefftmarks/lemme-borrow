class SearchesController < ApplicationController
	before_action :set_user, only: [:my_belongings, :search_users, :search_items]

	def my_belongings
		start = search_params[:count].to_i
		finish = start + 19

		if search_params[:sort] == "newest"
			sort = :desc
		elsif search_params[:sort] == "oldest"
			sort = :asc
		end

		query = search_params[:query] ? search_params[:query].downcase : ""
	
		items = @user.belongings.order(created_at: sort).select do |item|
			item[:name].downcase.include?(query) || item.tags_array.include?(query)
		end

		render json: { items: items[start..finish], total: items.size }
	end

	def search_users
		query = search_params[:query]

		users = User.where.not(id: @user.id).where("first_name ilike ? or last_name ilike ? or username ilike ?", "%#{query}%", "%#{query}%", "%#{query}%")

		render json: users.order(:last_name)
	end

	def search_items
		query = search_params[:query] ? search_params[:query].downcase : ""
	
		items = Item.all.order(:name).select do |item|
			item.belongs_to_friend(@user) && (item[:name].downcase.include?(query) || item.tags_array.include?(query))
		end

		render json: items
	end

	private

	def search_params
		params.permit(:query, :count, :sort)
	end

	def set_user
		@user = User.find(params[:user_id])
	end
end
