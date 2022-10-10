class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
			t.string :name
			t.text :description
			t.string :image

			t.references :owner, references: :users, foreign_key: { to_table: :users }
			t.references :borrower, references: :users, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
