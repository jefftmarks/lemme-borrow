import React from "react";
import FriendCard from "./FriendCard";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import "./MyFriends.css";

function MyFriends({ friends, showFriends, setShowFriends, profile }) {

	// ---------- Conditionally Render Friends Modal ----------

	if (!showFriends) {
		return null;
	}

	return (
		<div className="my-friends">
			<div className="friends-container">
				<div className="friends-header">
					<p>{profile.is_active ? "My Friends" : `${profile.user.first_name}'s Friends`}</p>
					<MdCancel
						onClick={() => setShowFriends(false)}
						size="27"
					/>
				</div>
				<div className="friends-list">
					{friends.map((friend) => (
						<Link
							key={friend.id}
							to={`/user/${friend.id}`}
							onClick={() => setShowFriends(false)}
						>
							<FriendCard friend={friend}/>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default MyFriends;