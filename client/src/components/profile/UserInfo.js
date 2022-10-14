import React, { useState } from "react";
import EditProfile from "./EditProfile";
import MyFriends from "./MyFriends";
import "./UserInfo.css";

function UserInfo({ profile, activeUser, setActiveUser, isActiveUser, friendStatus, setFriendStatus }) {
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
					<button>Add Item</button>
					<button onClick={() => setShowEditProfile(true)}>
						Edit My Profile
					</button>
					<button onClick={() => setShowFriends(true)}>
						My Friends
					</button>
				</div>
			)
		// If your friend's page
		} else if (friendStatus.is_friends) {
			return (
				<div id="user-actions">
					<button onClick={handleUnfriend}>
						Unfriend {profile.first_name}
					</button>
					<button>
						View {profile.first_name}'s' Friends
					</button>
				</div>
			)
		// If you friended them but they haven't responded to your request
		} else if (friendStatus.mode === "Pending Response") {
			return (
				<div id="user-actions">
					<button>
						Friend Request Pending . . .
					</button>
				</div>
			)
		} else if (friendStatus.mode === "Pending Action") {
			return (
				<div id="user-actions">
					<button onClick={handleAcceptFriendRequest}>
						Respond to {profile.first_name}'s Friend Request
					</button>
				</div>
			)
		} else {
			return (
				<div id="user-actions">
					<button onClick={handleSendFriendRequest}>
						Friend {profile.first_name}
					</button>
				</div>
			)
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
				activeUser={activeUser} 
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