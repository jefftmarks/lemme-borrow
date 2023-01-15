import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ActiveUserContext } from "../../context/active_user";
import UserInfo from "./user/UserInfo";
import Cupboard from "./cupboard/Cupboard";
import "./Profile.css";

function Profile({ onClickItem, onClickAddItem }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [profile, setProfile ] = useState(null);
	const [friends, setFriends] = useState([]);
	const [isUnfriending, setIsUnfriending] = useState(false);

	const params = useParams();

	// ---------- Render User From URL Parameter ----------

	useEffect(() => {
		setIsUnfriending(false);
		setFriends([]);
		// If we're on our own proflile page, no additional server request necessary
		if (activeUser.id === parseInt(params.user_id)) {
			setProfile({
				user: activeUser,
				is_active: true,
			});
		// If not our own page, request friend status between profile user and active user
		} else {
			fetch(`/api/friend_statuses/user/${activeUser.id}/friend/${params.user_id}`)
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

	// ---------- Conditionally Render Profile Page ----------

	if (!profile) {
		return null;
	}

	return (
		<div className="profile">
			<UserInfo
				profile={profile}
				setProfile={setProfile}
				isUnfriending={isUnfriending}
				setIsUnfriending={setIsUnfriending}
				friends={friends}
				setFriends={setFriends}
				onClickAddItem={onClickAddItem}
			/>
			{/* Only show cupboard if our own page or page of a friend */}
			{profile.is_active || profile.friend_status.mode === "Friends" ? (
				<Cupboard
				profile={profile}
				onClickItem={onClickItem}
				/>
			) : null}
		</div>
	);
}

export default Profile;