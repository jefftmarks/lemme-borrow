class ClothesInfo < ApplicationRecord
	belongs_to :item

	validates :size, presence: true
end
