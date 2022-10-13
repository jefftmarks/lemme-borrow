class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :requested, :status, :image, :owner_id, :borrower_id

	# No category for now
end
