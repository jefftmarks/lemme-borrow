import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
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
	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState([]);

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
						sessionStorage.setItem("jwt", data.token);
						setShowSignup(false);
						setUser(data.user);
					});
				} else {
					res.json().then((data) => setErrors(data.errors));
				}
			})
	}

	// Conditionally render signup modal
	if (!showSignup) {
		return null;
	}

	return (
		<div className="signup">
			<div className="signup-container">
				<div className="signup-header">
					<p>Create Account</p>
					<MdCancel
						onClick={() => setShowSignup(false)}
						size="27"
					/>
				</div>
				<form onSubmit={handleSubmit}>
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
						<ul className="errors">
							{errors.map((error) => (
								<li key={error}>{error}</li>
							))}
						</ul>
				</form>
			</div>
		</div>
	);
}

export default SignUp;