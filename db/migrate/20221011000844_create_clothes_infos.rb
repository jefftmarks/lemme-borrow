class CreateClothesInfos < ActiveRecord::Migration[6.1]
  def change
    create_table :clothes_infos do |t|
      t.integer :item_id
      t.string :size

      t.timestamps
    end
  end
end
