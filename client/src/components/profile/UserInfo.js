import React, { useState } from "react";
import EditProfile from "./EditProfile";
import MyFriends from "./MyFriends";
import "./UserInfo.css";

function UserInfo({ profile, activeUser, setActiveUser, isActiveUser, friendStatus, setFriendStatus, isUnfriending, setIsUnfriending, friends, setFriends }) {
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [showFriends, setShowFriends] = useState(false);

	// ---------- Friendings, Unfriending & Accepting Friend Requests ----------

	function handleUnfriend() {
		// Delete request to ID of friendship instance
		fetch(`/friendships/${friendStatus.is_friends}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((status) => setFriendStatus(status));
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
				receiver_id: profile.id,
			}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((status) => setFriendStatus(status));
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
				friend_id: profile.id,
			}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((status) => setFriendStatus(status));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}

	// ---------- Render Buttons Based on Friend Status ----------

	function renderButtons() {
		// If your own page
		if (isActiveUser) {
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
		// If your friend's page
		} else if (friendStatus.is_friends) {
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
							Unfriend {profile.first_name}
						</button>
					)}
					<button id="user-btn" onClick={onClickShowFriends}>
						View {profile.first_name}'s' Friends
					</button>
				</div>
			)
		// If you friended them but they haven't responded to your request
		} else if (friendStatus.mode === "Pending Response") {
			return (
				<div id="user-actions">
					<button id="user-btn">
						Friend Request Pending . . .
					</button>
				</div>
			)
		} else if (friendStatus.mode === "Pending Action") {
			return (
				<div id="user-actions">
					<button id="user-btn" onClick={handleAcceptFriendRequest}>
						Respond to {profile.first_name}'s Friend Request
					</button>
				</div>
			)
		} else {
			return (
				<div id="user-actions">
					<button id="user-btn" onClick={handleSendFriendRequest}>
						Friend {profile.first_name}
					</button>
				</div>
			)
		}
	}

	// ---------- Render Friends ----------

	function onClickShowFriends() {
		fetch(`/friendships/user/${profile.id}`)
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
				isActiveUser={isActiveUser}
				friends={friends}
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