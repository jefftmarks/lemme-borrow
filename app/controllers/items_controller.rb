class ItemsController < ApplicationController
	before_action :set_item, only: [:show, :update, :destroy]

	def index
		render json: Item.all
	end

	def show
		render json: @item
	end

	def my_belongings
		user = User.find(params[:user_id])
		render json: user.belongings
	end

	def my_loans
		user = User.find(params[:user_id])
		loans = user.belongings.where("status = ?", "on loan")
	end

	def my_borrowed_items
		user = User.find(params[:user_id])
		render json: user.borrowed_items
	end
	
	# This in theory should be able to handle all requests to change owner or person currently borrowing item
	def update
		@item.update!(item_params)
		if @item.category == "clothing"
			@item.clothes_info.update!(clothes_params)
		elsif @item.category == "book"
			@item.book_info.update!(book_params)
		end

		tags = tags_params[:tags]

		if tags.size > 0
			@item.item_tags.destroy_all
			tags.each do |tag|
				existing_tag = Tag.find_by(name: tag[:name])
				if existing_tag
					@item.tags << existing_tag
				else
					@item.tags << Tag.create!(name: tag[:name]) 
				end
			end
		end

		item = Item.find(@item.id)

		render json: item, status: :accepted

	end

	# Recently uploaded items for feed... eventually will update to something different and need to confirm whether where.not operator works
	def recently_uploaded
		items = Item.where.not(owner_id: params[:user_id])
	end

	def create
		item = Item.create!(item_params)

		if item.category == "clothing"
			clothes_info = ClothesInfo.create!(**clothes_params, item: item)
		elsif item.category == "book"
			book_info = BookInfo.create!(**book_params, item: item)
		end

		tags = tags_params[:tags]

		if tags.size > 0
			tags.each do |tag|
				existing_tag = Tag.find_by(name: tag[:name])
				if existing_tag
					item.tags << existing_tag
				else
					item.tags << Tag.create!(name: tag[:name]) 
				end
			end
		end

		render json: item, status: :created
	end

	def destroy
		# Necessary to error handle if item is currently being borrowed?
		@item.destroy
		render json: @item
	end

	private

	def item_params
		params.permit(:name, :status, :description, :image, :category, :owner_id, :borrower_id)
	end

	def clothes_params
		params.permit(:size)
	end

	def book_params
		params.permit(:author, :year, :genre)
	end

	def tags_params
		params.permit(:tags => [:name])
	end

	def set_item
		@item = Item.find(params[:id])
	end

end
