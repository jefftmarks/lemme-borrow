class PendingTicketsController < ApplicationController
	before_action :set_item, only: [:show]
	before_action :set_user, only: [:show]

	def show
		# Item is yours
		if @item.owner == @user
			render json: @item.tickets
		# Item is not yours but you've either requested or are borrowing it
		else
			tickets = @item.tickets.where(borrower: @user)
			render json: tickets
		end
	end
end

private

def set_item
	@item = Item.find(params[:item_id])
end

def set_user
	@user = User.find(params[:user_id])
end