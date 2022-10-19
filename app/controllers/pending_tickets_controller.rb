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

	def between_friends
		lending = @user.lending_tickets.where(borrower: @friend)
		borrowing = @user.borrowing_tickets.where(owner: @friend)

		payload = [];

		lending.each do |ticket|

			if ticket.return_date != ""
				ticket.update!(overdue: ticket.is_overdue(ticket.return_date))
			else
				ticket.update!(overdue: false)
			end

			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: "#{@friend.first_name} is borrowing your item: #{ticket.item.name}",
					overdue: ticket.overdue,
					return_date: ticket.return_date
				}
			)
		end

		borrowing.each do |ticket|

			if ticket.return_date != ""
				ticket.update!(overdue: ticket.is_overdue(ticket.return_date))
			else
				ticket.update!(overdue: false)
			end

			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: "#{@friend.first_name} is borrowing your item: #{ticket.item.name}",
					overdue: ticket.overdue,
					return_date: ticket.return_date
				}
			)
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

def set_friend
	@friend = User.find(params[:friend_id])
end