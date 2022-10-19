import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import Cupboard from "./Cupboard";
import "./Profile.css";

function Profile({ activeUser, setActiveUser, onClickItem, onClickAddItem }) {
	// Profile will keep track of user, whether user is active user, and if not, what friend status is between active user and this user
	const [profile, setProfile ] = useState(null);
	const [friends, setFriends] = useState([]);

	// Double check before you unfriend
	const [isUnfriending, setIsUnfriending] = useState(false);

	const params = useParams();

	// ---------- Render User ----------

	// Use the URL params to grab user whose profile it is
	useEffect(() => {
		setIsUnfriending(false);
		setFriends([]);
		// If on user's own page
		if (activeUser.id === parseInt(params.user_id)) {
			setProfile({
				user: activeUser,
				is_active: true,
			});
		} else {
			// Custom route that returns friend status plus the user data
			fetch(`/friend_statuses/user/${activeUser.id}/friend/${params.user_id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						setProfile({
							user: data.user,
							is_active: false,
							friend_status: data.status,
						});
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
						<img id="profile-pic" src={profile.user.avatar} alt="avatar" />
						<UserInfo
							profile={profile}
							setProfile={setProfile}
							activeUser={activeUser}
							setActiveUser={setActiveUser}
							isUnfriending={isUnfriending}
							setIsUnfriending={setIsUnfriending}
							friends={friends}
							setFriends={setFriends}
							onClickAddItem={onClickAddItem}
						/>
					</div>
					<div id="cupboard-search-container"></div>
				</div>
				{profile.is_active || profile.friend_status.mode === "Friends" ? (
					<Cupboard
					profile={profile}
					onClickItem={onClickItem}
				/>
				) : null}
			</div>
		</div>
	);
}

export default Profile;