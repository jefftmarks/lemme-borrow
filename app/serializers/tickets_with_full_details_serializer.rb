class TicketsWithFullDetailsSerializer < ActiveModel::Serializer
  attributes :id, :status, :return_date

	belongs_to :owner
	belongs_to :borrower
	belongs_to :item
	# has_many :messages
end
