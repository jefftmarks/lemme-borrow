class DropClothesInfos < ActiveRecord::Migration[6.1]
  def change
		drop_table :clothes_infos
  end
end
