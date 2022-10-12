class RemoveConditionFromItems < ActiveRecord::Migration[6.1]
  def change
		remove_column :items, :condition, :string
  end
end
