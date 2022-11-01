import React, { useState, useContext } from "react";
import { ActiveUserContext } from "../../context/active_user";
import "./Login.css";

const initialState = { username: "", password: "" };

// ---------- Nav Bar: No Active User ----------

function Login({ setShowSignup }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [formData, setFormData] = useState(initialState);
	const [error, setError] = useState(null);

	// ---------- Login Form Submission ----------

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(e) {
		e.preventDefault();
		fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				setFormData(initialState);
				if (res.ok) {
					// Handle JWT token
					res.json().then((data) => {
						localStorage.setItem("jwt", data.token);
						setActiveUser(data.user);
					});
				} else {
					res.json().then((data) => setError(data.error));
				}
			})
	}

	return (
		<div className="login">
			{/* Render error if incorrect login */}
			{error ? <p className="error">{error}</p> : null}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					required
					name="username"
					placeholder="username"
					value={formData.username}
					onChange={handleChange}
				/>
				<input
					type="password"
					required
					name="password"
					placeholder="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<button>Sign In</button>
			</form>
			<span onClick={() => setShowSignup(true)}>Create Account</span>
		</div>
	);
}

export default Login;