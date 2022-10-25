import React, { useState } from "react";
import "./Login.css";

const initialState = { username: "", password: "" };

function Login({ setUser, setShowSignup }) {
	const [formData, setFormData] = useState(initialState);
	const [error, setError] = useState(null);

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
					res.json().then((data) => {
						sessionStorage.setItem("jwt", data.token);
						setUser(data.user);
					});
				} else {
					res.json().then((data) => setError(data.error));
				}
			})
	}

	return (
		<div className="login">
			{error ? <p>{error}</p> : null}
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