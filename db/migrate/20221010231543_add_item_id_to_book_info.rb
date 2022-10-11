class AddItemIdToBookInfo < ActiveRecord::Migration[6.1]
  def change
    add_column :book_infos, :item_id, :integer
  end
end
