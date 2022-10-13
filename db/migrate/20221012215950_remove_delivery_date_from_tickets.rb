class RemoveDeliveryDateFromTickets < ActiveRecord::Migration[6.1]
  def change
    remove_column :tickets, :delivery_date, :string
  end
end
