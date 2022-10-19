class RemoveQueueNoFromTickets < ActiveRecord::Migration[6.1]
  def change
    remove_column :tickets, :queue_no, :integer
  end
end
