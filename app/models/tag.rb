class Tag < ApplicationRecord
	has_many :item_tags, dependent: :destroy
	has_many :items, through: :item_tags

	validates :name, presence: true, uniqueness: { case_sensitive: false }
end
