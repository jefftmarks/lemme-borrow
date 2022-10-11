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
		render json: @item, status: :accepted
	end

	# Recently uploaded items for feed... eventually will update to something different and need to confirm whether where.not operator works
	def recently_uploaded
		items = Item.where.not(owner_id: params[:user_id])
	end

	def create
		item = Item.create!(item_params)
		render json: item, status: :created
	end

	def destroy
		# Necessary to error handle if item is currently being borrow?
		@item.destroy
		render json: @item
	end

	private

	def item_params
		params.permit(:name, :status, :description, :image, :category, :owner_id, :borrower_id, book_info_attributes: [ :author, :year, :genre ], clothes_info_attributes: [ :size ])
	end

	def set_item
		@item = Item.find(params[:id])
	end

end
