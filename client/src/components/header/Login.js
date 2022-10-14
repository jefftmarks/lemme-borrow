import React, { useState } from "react";
import "./Login.css";

const initialState = { username: "", password: "" };

function Login({ setUser, setShowSignup }) {
	const [formData, setFormData] = useState(initialState);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(e) {
		e.preventDefault();
		// setErrors([]);
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
					res.json().then((data) => {
						localStorage.setItem("jwt", data.token);
						setUser(data.user);
					});
				} else {
					res.json().then((data) => {
						console.log(data);
						// setErrors...
					});
				}
			})
	}

	return (
		<div id="login">
			<form id="login-form" onSubmit={handleSubmit}>
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