import React, { useState, useContext } from "react";
import { ActiveUserContext } from "../../../context/active_user";
import { MdCancel } from "react-icons/md";
import "./EditProfile.css";

function EditProfile({ showEditProfile, setShowEditProfile}) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	
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

	// ---------- Form Handling ----------

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
		fetch(`/api/users/${activeUser.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...formData,
				// Include boolean value to let backend know whether user is updating their password
				new_password: showUpdatePassword
			}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((user) => {
						setShowEditProfile(false);
						setActiveUser(user);
						setFormData(initialState);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}

	// ---------- Conditionally Render Edit Profile Modal ----------

	if (!showEditProfile) {
		return null;
	}

	function onClickEx() {
		setFormData(activeUser);
		setShowUpdatePassword(false);
		setShowEditProfile(false);
	}

	return (
		<div className="signup">
			<div className="signup-container">
				<div className="signup-header">
					<p>Edit My Profile</p>
					<MdCancel
						onClick={onClickEx}
						size="27"
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<label><p>First Name:</p>
							<input
							required
							type="text"
							name="first_name"
							onChange={handleChange}
							value={formData.first_name}
							/>
						</label>
						<label><p>Last Name:</p>
							<input
							required
							type="text"
							name="last_name"
							onChange={handleChange}
							value={formData.last_name}
							/>
						</label>
						<label><p>Username:</p>
							<input
							required
							type="text"
							name="username"
							onChange={handleChange}
							value={formData.username}
							/>
						</label>
						<label><p>Avatar:</p>
							<input
							type="text"
							name="avatar"
							onChange={handleChange}
							value={formData.avatar}
							/>
						</label>
						<label><p>Enter Your Current Password:</p>
							<input
							required
							type="password"
							name="current_password"
							onChange={handleChange}
							value={formData.current_password}
							/>
						</label>

						{/* ---------- Update Password ========== */}
						
						{showUpdatePassword ? (
							<div className="new-password">
								<div className="update-password-header">
									<p>Update Password</p>
									<button onClick={() => setShowUpdatePassword(false)}>
										Never Mind
									</button>
								</div>
								<label><p>New Password:</p>
									<input
									required
									type="password"
									name="password"
									onChange={handleChange}
									value={formData.password}
									/>
								</label>
								<label><p>Confirm New Password:</p>
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
							<span
								className="update-password"
								onClick={() => setShowUpdatePassword(true)}
							>
								Update Password?
							</span>
						)}
						<button>Update Profile</button>
				</form>
			</div>	
		</div>
	);
}

export default EditProfile;