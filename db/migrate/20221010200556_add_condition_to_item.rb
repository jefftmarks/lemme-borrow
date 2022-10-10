class AddConditionToItem < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :condition, :string
  end
end
