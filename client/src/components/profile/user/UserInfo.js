import React, { useState, useContext } from "react";
import { ActiveUserContext } from "../../../context/active_user";
import EditProfile from "./EditProfile";
import MyFriends from "../friends/MyFriends";
import "./UserInfo.css";

function UserInfo({ profile, setProfile, isUnfriending, setIsUnfriending, friends, setFriends, onClickAddItem }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [showFriends, setShowFriends] = useState(false);

	// ---------- Trigger Friends Modal and Request Friends ----------

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

	// Unfriend
	function handleUnfriend() {
		// Include ID of friendship instance
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

	// Send friend request
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

	// Accept friend request
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

	// Decline friend request
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
		// On active user's page
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
				// Active user is friends with profile user
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
				// Profile user has yet to respond to active user's friend request
				case "Pending Response":
					return (
						<div className="user-actions">
							<button className="user-btn">
								Friend Request Pending . . .
							</button>
						</div>
					);
				// Active user has yet to respond to profile user's friend request
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
				// Default: not friends
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
			{/* ---------- Modals ---------- */}

			<EditProfile
				showEditProfile={showEditProfile}
				setShowEditProfile={setShowEditProfile}
			/>
			<MyFriends
				profile={profile}
				friends={friends}
				showFriends={showFriends}
				setShowFriends={setShowFriends}
			/>

			{/* ---------- */}

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