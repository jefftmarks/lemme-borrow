import React, { useState, useContext } from "react";
import { ActiveUserContext } from "../../context/active_user";
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

function SignUp({ showSignup, setShowSignup }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState([]);

	// ---------- Form Handling ----------

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
						// Store JWT token
						localStorage.setItem("jwt", data.token);
						setShowSignup(false);
						setActiveUser(data.user);
					});
				} else {
					res.json().then((data) => setErrors(data.errors));
				}
			})
	}

	// ---------- Conditionally Render Signup Modal ----------
	
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
						<label><p>Email:</p>
							<input
							required
							type="email"
							name="email"
							onChange={handleChange}
							value={formData.email}
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
						<label><p>Password:</p>
							<input
							required
							type="password"
							name="password"
							onChange={handleChange}
							value={formData.password}
							/>
						</label>
						<label><p>Confirm Password:</p>
							<input
							required
							type="password"
							name="password_confirmation"
							onChange={handleChange}
							value={formData.password_confirmation}
							/>
						</label>
						<button className="signup-btn">Sign Up</button>
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