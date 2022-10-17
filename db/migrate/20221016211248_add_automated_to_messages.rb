class AddAutomatedToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :automated, :boolean
  end
end
