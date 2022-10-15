import React, { useState } from "react";
import EditProfile from "./EditProfile";
import MyFriends from "./MyFriends";
import "./UserInfo.css";

function UserInfo({ profile, setProfile, activeUser, setActiveUser, isUnfriending, setIsUnfriending, friends, setFriends }) {
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [showFriends, setShowFriends] = useState(false);

	// ---------- Render Friends ----------

	function onClickShowFriends() {
		fetch(`/friendships/user/${profile.user.id}`)
			.then((res) => {
				if (res.ok) {
					setIsUnfriending(false);
					setShowFriends(true);
					res.json().then((friends) => setFriends(friends));
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}

	// ---------- Friendings, Unfriending & Accepting Friend Requests ----------

	function handleUnfriend() {
		// Delete request to ID of friendship instance
		fetch(`/friendships/${profile.friend_status.id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((status) => setProfile({
						...profile,
						friend_status: status,
					}));
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}

	function handleSendFriendRequest() {
		fetch("/friend_requests", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				requester_id: activeUser.id,
				receiver_id: profile.user.id,
			}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((status) => setProfile({
						...profile,
						friend_status: status,
					}));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}

	function handleAcceptFriendRequest() {
		fetch("/friendships", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id: activeUser.id,
				friend_id: profile.user.id,
			}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((status) => setProfile({
						...profile,
						friend_status: status,
					}));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}

	// ---------- Render Buttons Based on Friend Status ----------

	function renderButtons() {
		if (profile.is_active) {
			return (
				<div id="user-actions">
					<button id="user-btn">Add Item</button>
					<button id="user-btn" onClick={() => setShowEditProfile(true)}>
						Edit My Profile
					</button>
					<button id="user-btn" onClick={onClickShowFriends}>
						My Friends
					</button>
				</div>
			)
		} else {
			switch (profile.friend_status.mode) {
				case "Friends":
					return (
						<div id="user-actions">
							{isUnfriending ? (
								<div id="unfriend-container">
									<div>Are You Sure?</div>
									<button id="unfriend-yes" onClick={handleUnfriend}>
										Yes
									</button>
									<button id="unfriend-no" onClick={() => setIsUnfriending(false)}>
										No
									</button>
								</div>
							) : (
								<button id="user-btn" onClick={() => setIsUnfriending(true)}>
									Unfriend {profile.user.first_name}
								</button>
							)}
							<button id="user-btn" onClick={onClickShowFriends}>
								View {profile.user.first_name}'s' Friends
							</button>
						</div>
					);
				case "Pending Response":
					return (
						<div id="user-actions">
							<button id="user-btn">
								Friend Request Pending . . .
							</button>
						</div>
					);
				case "Pending Action":
					return (
						<div id="user-actions">
							<button id="user-btn" onClick={handleAcceptFriendRequest}>
								Respond to {profile.user.first_name}'s Friend Request
							</button>
						</div>
					);
				default:
					return (
						<div id="user-actions">
							<button id="user-btn" onClick={handleSendFriendRequest}>
								Friend {profile.user.first_name}
							</button>
						</div>
					);
			}
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
				profile={profile}
				friends={friends}
				showFriends={showFriends}
				setShowFriends={setShowFriends}
			/>
			<div id="user-info">
				<h3>{profile.is_active ? "My" : profile.user.first_name + "'s"} Cupboard</h3>
				{renderButtons()}
			</div>
		</>
	);
}

export default UserInfo;