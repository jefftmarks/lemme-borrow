class TicketSerializer < ActiveModel::Serializer
  attributes :id, :owner_id, :borrower_id, :item_id, :overdue, :return_date

	# belongs_to :owner
	# belongs_to :borrower
	belongs_to :item
	# has_many :messages
end
