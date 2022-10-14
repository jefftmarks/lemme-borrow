import React, { useState } from "react";
import EditProfile from "./EditProfile";
import MyFriends from "./MyFriends";
import "./UserInfo.css";

function UserInfo({ profile, activeUser, setActiveUser, isActiveUser }) {
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [showFriends, setShowFriends] = useState(false);

	function renderButtons() {
		if (isActiveUser) {
			return (
				<div id="user-actions">
					<button>Add Item</button>
					<button onClick={() => setShowEditProfile(true)}>
						Edit My Profile
					</button>
					<button onClick={() => setShowFriends(true)}>
						My Friends
					</button>
				</div>
			)
		}
	}

	return (
		<>
			<EditProfile
				showEditProfile={showEditProfile}
				setShowEditProfile={setShowEditProfile}
				activeUser={activeUser}
				setActiveUser={setActiveUser}
			/>
			<MyFriends
				activeUser={activeUser} 
				showFriends={showFriends}
				setShowFriends={setShowFriends}
			/>
			<div id="user-info">
				<h3>{isActiveUser ? "My" : profile.first_name + "'s"} Cupboard</h3>
				{renderButtons()}
			</div>
		</>
	);
}

export default UserInfo;