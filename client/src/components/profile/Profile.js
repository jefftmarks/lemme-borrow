import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import "./Profile.css";

function Profile({ activeUser, setActiveUser }) {
	const [profile, setProfile ] = useState(null);
	const [isActiveUser, setIsActiveuser] = useState(false);

	const params = useParams();

	// Use the URL params to grab user whose profile it is
	useEffect(() => {
		fetch(`/users/${params.user_id}`)
		.then((res) => {
			if (res.ok) {
				res.json().then((profile) => {
					setProfile(profile);
					if (profile.id === activeUser.id) {
						setIsActiveuser(true);
					}
				});
			} else {
				res.json().then((data) => console.log(data));
			}
		});
	}, []);

	if (!profile) {
		return null;
	}

	return (
		<div id="profile">
			<div id="profile-container">
				<div id="profile-header">
					<div id="user-card">
						<img src={profile.avatar} alt="avatar" />
						<UserInfo
							profile={profile}
							activeUser={activeUser}
							setActiveUser={setActiveUser}
							isActiveUser={isActiveUser}
						/>
					</div>
					<div id="cupboard-search-container"></div>
				</div>
			</div>
		</div>
	);
}

export default Profile;