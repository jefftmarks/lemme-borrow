class BookInfo < ApplicationRecord
	belongs_to :item

	validates :author, presence: true
end
