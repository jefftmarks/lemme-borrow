import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import "./Profile.css";

function Profile({ activeUser, setActiveUser }) {
	const [profile, setProfile ] = useState(null);
	const [isActiveUser, setIsActiveuser] = useState(false);
	const [friendStatus, setFriendStatus] = useState({});
	const [friends, setFriends] = useState([]);

	// Double check before you unfriend
	const [isUnfriending, setIsUnfriending] = useState(false);

	const params = useParams();

	// Use the URL params to grab user whose profile it is
	useEffect(() => {
		setIsUnfriending(false);
		setFriends([]);
		if (activeUser.id === parseInt(params.user_id)) {
			setProfile(activeUser);
			setIsActiveuser(true);
		} else {
			// Custom route that returns friend status plus the user data
			fetch(`/friend_statuses/user/${activeUser.id}/friend/${params.user_id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						setIsActiveuser(false);
						setFriendStatus(data.status)
						setProfile(data.user);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
		}
	}, [params, activeUser]);

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
							friendStatus={friendStatus}
							setFriendStatus={setFriendStatus}
							isUnfriending={isUnfriending}
							setIsUnfriending={setIsUnfriending}
							friends={friends}
							setFriends={setFriends}
						/>
					</div>
					<div id="cupboard-search-container"></div>
				</div>
			</div>
		</div>
	);
}

export default Profile;