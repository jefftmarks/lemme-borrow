import React from "react";
import "./UserInfo.css";

function UserInfo({ user }) {
	return (
		<div id="user-info">
			<h3>{user.first_name}'s Cupboard</h3>
			<div id="user-actions">
				<button>Edit Profile</button>
				<button>Friends</button>
			</div>
		</div>
	);
}

export default UserInfo;