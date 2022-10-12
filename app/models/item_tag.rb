class ItemTag < ApplicationRecord
	belongs_to :item
	belongs_to :tag

	validates :tag, uniqueness: { scope: :item, message: "must be unique" }
end
