class AddDeliveryDateAndReturnDateToTickets < ActiveRecord::Migration[6.1]
  def change
    add_column :tickets, :delivery_date, :string
    add_column :tickets, :return_date, :string
  end
end
