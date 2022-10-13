class ItemWithFullDetailsSerializer < ActiveModel::Serializer
	attributes :id, :name, :status, :requested, :description, :image, :owner_id, :borrower_id, :tags

	def tags
		self.object.tags.map { |tag| tag[:name] }
	end

	# No category for now

	# has_one :book_info, if: :is_book?
	# has_one :clothes_info, if: :is_clothing?

	# def is_clothing?
	# 	true if object.clothes_info
	# end

	# def is_book?
	# 	true if object.book_info
	# end
end
