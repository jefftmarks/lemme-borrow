import React, { useState } from "react";
import EditProfile from "./EditProfile";
import MyFriends from "../friends/MyFriends";
import "./UserInfo.css";

function UserInfo({ profile, setProfile, activeUser, setActiveUser, isUnfriending, setIsUnfriending, friends, setFriends, onClickAddItem }) {
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
					res.json().then((data) => {
						alert(data.error);
						setIsUnfriending(false);
					});
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

	function handleDeclineFriendRequest() {
		fetch(`/friend_requests/${profile.friend_status.id}`, {
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
			})
	}

	// ---------- Render Buttons Based on Friend Status ----------

	function renderButtons() {
		if (profile.is_active) {
			return (
				<div className="user-actions">
					<button className="user-btn" onClick={onClickAddItem}>
						Add Item
					</button>
					<button className="user-btn" onClick={() => setShowEditProfile(true)}>
						Edit My Profile
					</button>
					<button className="user-btn" onClick={onClickShowFriends}>
						My Friends
					</button>
				</div>
			)
		} else {
			switch (profile.friend_status.mode) {
				case "Friends":
					return (
						<div className="user-actions">
							{isUnfriending ? (
								<div className="unfriend-container">
									<p>Are You Sure?</p>
									<button className="yes" onClick={handleUnfriend}>
										Yes
									</button>
									<button className="no" onClick={() => setIsUnfriending(false)}>
										No
									</button>
								</div>
							) : (
								<button className="user-btn" onClick={() => setIsUnfriending(true)}>
									Unfriend {profile.user.first_name}
								</button>
							)}
							<button className="user-btn" onClick={onClickShowFriends}>
								View {profile.user.first_name}'s' Friends
							</button>
						</div>
					);
				case "Pending Response":
					return (
						<div className="user-actions">
							<button className="user-btn">
								Friend Request Pending . . .
							</button>
						</div>
					);
				case "Pending Action":
					return (
						<div className="user-actions">
							<button className="user-btn" onClick={handleAcceptFriendRequest}>
								Accept {profile.user.first_name}'s Friend Request
							</button>
							<button className="user-btn" onClick={handleDeclineFriendRequest}>
								Decline {profile.user.first_name}'s Friend Request
							</button>
						</div>
					);
				default:
					return (
						<div className="user-actions">
							<button className="user-btn" onClick={handleSendFriendRequest}>
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

			<div className="user-info">
				<div className="user-info-top">
					<p className="user-info-header">{profile.is_active ? "My" : profile.user.first_name + "'s"} Cupboard</p>
					<img src={profile.user.avatar} alt="avatar" />
				</div>
				<div className="user-info-bottom">
					<p className="user-info-subheader">{profile.user.first_name} {profile.user.last_name}</p>
					{renderButtons()}
				</div>
			</div>
		</>
	);
}

export default UserInfo;