class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :tickets do |t|
			t.string :status
			t.integer :item_id

			t.references :owner, references: :users, foreign_key: { to_table: :users }
			t.references :borrower, references: :users, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
