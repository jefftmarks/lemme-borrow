class DropBookInfos < ActiveRecord::Migration[6.1]
  def change
		drop_table :book_infos
  end
end
