import React, { useState } from "react";
import EditProfile from "./EditProfile";
import "./UserInfo.css";

function UserInfo({ user, setProfile, setActiveUser, isActiveUser }) {
	const [showEditProfile, setShowEditProfile] = useState(false);

	function renderButtons() {
		if (isActiveUser) {
			return (
				<div id="user-actions">
					<button>Add Item</button>
					<button onClick={() => setShowEditProfile(true)}>Edit My Profile</button>
					<button>My Friends</button>
				</div>
			)
		}
	}

	return (
		<>
			<EditProfile
				showEditProfile={showEditProfile}
				setShowEditProfile={setShowEditProfile}
				setProfile={setProfile}
				activeUser={user}
				setActiveUser={setActiveUser}
		/>
			<div id="user-info">
				<h3>{isActiveUser ? "My" : user.first_name + "'s"} Cupboard</h3>
				{renderButtons()}
			</div>
		</>
	);
}

export default UserInfo;