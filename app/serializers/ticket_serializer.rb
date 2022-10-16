class TicketSerializer < ActiveModel::Serializer
  attributes :id, :status, :return_date, :overdue

	belongs_to :owner
	belongs_to :borrower
	belongs_to :item
end
