import React, { useState } from "react";
import "./SignUp.css";

const initialState = {
	first_name: "",
	last_name: "",
	email: "",
	username: "",
	avatar: "",
	password: "",
	password_confirmation: ""
}

function SignUp({ showSignup, setShowSignup, setUser }) {
	const [formData, setFormData] = useState(initialState)

	// Conditionally render signup modal
	if (!showSignup) {
		return null;
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();
		fetch("/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						localStorage.setItem("jwt", data.token);
						setShowSignup(false);
						setUser(data.user);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}

	return (
		<div id="signup">
			<form id="signup-form" onSubmit={handleSubmit}>
				<div id="signup-header">
					<h2>Create Account</h2>
					<span onClick={() => setShowSignup(false)}>X</span>
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
					<label>Email:
						<input
						required
						type="email"
						name="email"
						onChange={handleChange}
						value={formData.email}
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
					<label>Password:
						<input
						required
						type="password"
						name="password"
						onChange={handleChange}
						value={formData.password}
						/>
					</label>
					<label>Confirm Password:
						<input
						required
						type="password"
						name="password_confirmation"
						onChange={handleChange}
						value={formData.password_confirmation}
						/>
					</label>
					<button>Sign Up</button>
			</form>
		</div>
	);
}

export default SignUp;