import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./user/UserInfo";
import Cupboard from "./cupboard/Cupboard";
import "./Profile.css";

function Profile({ activeUser, setActiveUser, onClickItem, onClickAddItem }) {
	const [profile, setProfile ] = useState(null);
	const [friends, setFriends] = useState([]);
	const [isUnfriending, setIsUnfriending] = useState(false);

	const params = useParams();

	// ---------- Render User ----------

	useEffect(() => {
		setIsUnfriending(false);
		setFriends([]);
		if (activeUser.id === parseInt(params.user_id)) {
			setProfile({
				user: activeUser,
				is_active: true,
			});
		} else {
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
		<div className="profile">

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