class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :category, :description, :condition, :image, :owner_id, :borrower_id

	has_many :tags
	has_one :book_info, if: :is_book?
	has_one :clothes_info, if: :is_clothing?

	def is_clothing?
		true if object.clothes_info
	end

	def is_book?
		true if object.book_info
	end

end
