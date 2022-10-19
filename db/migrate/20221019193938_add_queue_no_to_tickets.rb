class AddQueueNoToTickets < ActiveRecord::Migration[6.1]
  def change
    add_column :tickets, :queue_no, :integer
  end
end
