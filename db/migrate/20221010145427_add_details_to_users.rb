class AddDetailsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :last_name, :string
    add_column :users, :email, :string
  end
end
