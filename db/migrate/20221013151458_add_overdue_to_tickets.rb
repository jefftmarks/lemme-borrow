class AddOverdueToTickets < ActiveRecord::Migration[6.1]
  def change
    add_column :tickets, :overdue, :boolean
  end
end
