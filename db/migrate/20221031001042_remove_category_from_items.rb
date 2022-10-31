class RemoveCategoryFromItems < ActiveRecord::Migration[6.1]
  def change
    remove_column :items, :category, :string
  end
end
