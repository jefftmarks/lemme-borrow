class RemoveRequestedFromItems < ActiveRecord::Migration[6.1]
  def change
    remove_column :items, :requested, :boolean
  end
end
