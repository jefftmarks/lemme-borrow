class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description, :condition, :image, :owner_id, :borrower_id

	has_one :book_info
	has_one :clothes_info
end
