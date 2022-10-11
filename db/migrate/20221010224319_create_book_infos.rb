class CreateBookInfos < ActiveRecord::Migration[6.1]
  def change
    create_table :book_infos do |t|
      t.string :author
      t.integer :year

      t.timestamps
    end
  end
end
