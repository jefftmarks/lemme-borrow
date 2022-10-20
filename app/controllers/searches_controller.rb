class SearchesController < ApplicationController
	before_action :set_user, only: [:my_belongings]

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

	private

	def search_params
		params.permit(:query, :count, :sort)
	end

	def set_user
		@user = User.find(params[:user_id])
	end
end
