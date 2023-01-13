class Api::SearchesController < ApplicationController
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

		users = User.where.not(id: @user.id).where("first_name ilike ? or last_name ilike ?", "%#{query}%", "%#{query}%").to_a

		users.concat(User.all.select { |user| user.full_name.downcase.include?(query.downcase) })

		render json: users.uniq.sort { |a, b| a.last_name <=> b.last_name }
	end

	def search_items
		query = search_params[:query] ? search_params[:query].downcase : ""
	
		items = Item.all.select do |item|
			(item.owner == @user || item.belongs_to_friend(@user)) && (item[:name].downcase.include?(query) || item.tags_array.include?(query))
		end

		render json: items.sort { |a, b| a.name <=> b.name }
	end

	private

	def search_params
		params.permit(:query, :count, :sort)
	end

	def set_user
		@user = User.find(params[:user_id])
	end
end
