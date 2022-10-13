class AddRequestedToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :requested, :boolean
  end
end
