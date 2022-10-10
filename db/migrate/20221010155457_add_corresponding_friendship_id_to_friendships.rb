class AddCorrespondingFriendshipIdToFriendships < ActiveRecord::Migration[6.1]
  def change
    add_column :friendships, :corresponding_friendship_id, :integer
  end
end
