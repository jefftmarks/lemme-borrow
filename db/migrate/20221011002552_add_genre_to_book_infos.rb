class AddGenreToBookInfos < ActiveRecord::Migration[6.1]
  def change
    add_column :book_infos, :genre, :string
  end
end
