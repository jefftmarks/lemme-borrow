import React, { useState } from "react";
import "./EditProfile.css";

function EditProfile({ showEditProfile, setShowEditProfile, activeUser, setActiveUser }) {
	
	const initialState = {
		first_name: activeUser.first_name,
		last_name: activeUser.last_name,
		username: activeUser.username,
		avatar: activeUser.avatar,
		current_password: "",
		password: "",
		password_confirmation: ""
	}

	const [formData, setFormData] = useState(initialState);
	const [showUpdatePassword, setShowUpdatePassword] = useState(false);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();

		// If user didn't provide avatar, keep avatar the same
		if (formData.avatar === "") {
			setFormData({...formData, avatar: activeUser.avatar});
		}

		fetch(`/users/${activeUser.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...formData,
				// include boolean value to let backend know whether user is updating password
				new_password: showUpdatePassword
			}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((user) => {
						setShowEditProfile(false);
						setActiveUser(user);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}

	function onClickEx() {
		setFormData(activeUser);
		setShowUpdatePassword(false);
		setShowEditProfile(false);
	}

	// Conditionally render edit profile modal
	if (!showEditProfile) {
		return null;
	}

	return (
		<div id="edit-profile">
			<form id="edit-profile-form" onSubmit={handleSubmit}>
				<div id="edit-profile-header">
					<h2>Edit My Profile</h2>
					<p onClick={onClickEx}>X</p>
				</div>
				<label>First Name:
						<input
						required
						type="text"
						name="first_name"
						onChange={handleChange}
						value={formData.first_name}
						/>
					</label>
					<label>Last Name:
						<input
						required
						type="text"
						name="last_name"
						onChange={handleChange}
						value={formData.last_name}
						/>
					</label>
					<label>Username:
						<input
						required
						type="text"
						name="username"
						onChange={handleChange}
						value={formData.username}
						/>
					</label>
					<label>Avatar:
						<input
						type="text"
						name="avatar"
						onChange={handleChange}
						value={formData.avatar}
						/>
					</label>
					<label>Enter Your Current Password:
						<input
						required
						type="password"
						name="current_password"
						onChange={handleChange}
						value={formData.current_password}
						/>
					</label>
					{showUpdatePassword ? (
						<div id="new-password">
							<p onClick={() => setShowUpdatePassword(false)}>X</p>
							<label>New Password:
								<input
								required
								type="password"
								name="password"
								onChange={handleChange}
								value={formData.password}
								/>
							</label>
							<label>Confirm New Password:
								<input
								required
								type="password"
								name="password_confirmation"
								onChange={handleChange}
								value={formData.password_confirmation}
								/>
							</label>
						</div>
					) : (
						<span onClick={() => setShowUpdatePassword(true)}>
							Update Password?
						</span>
					)}
					<button>Update Profile</button>
			</form>
		</div>
	);
}

export default EditProfile;