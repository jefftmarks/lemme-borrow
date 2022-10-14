import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import "./Profile.css";

function Profile({ activeUser }) {
	const [user, setUser ] = useState(null);
	const [isActiveUser, setIsActiveuser] = useState(false);

	const params = useParams();

	// Use the URL params to grab user whose profile it is
	useEffect(() => {
		if (activeUser) {
			fetch(`/users/${params.user_id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((user) => {
						setUser(user);
						if (user.id === activeUser.id) {
							setIsActiveuser(true);
						}
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
		}
	}, [activeUser]);

	if (!user) {
		return null;
	}

	return (
		<div id="profile">
			<div id="profile-container">
				<div id="profile-header">
					<div id="user-card">
						<img src={user.avatar} alt="avatar" />
						<UserInfo
							user={user}
						/>
					</div>
					<div id="cupboard-search-container"></div>
				</div>
			</div>
		</div>
	);
}

export default Profile;