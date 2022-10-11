class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
			t.text :text
			t.integer :ticket_id

			t.references :sender, references: :users, foreign_key: { to_table: :users }
			t.references :receiver, references: :users, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
