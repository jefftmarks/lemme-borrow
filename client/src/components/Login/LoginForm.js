import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function Login({ onLogin, isAuthorized }) {
	const initializedForm = { username: "", password: ""};
	const [formData, setFormData] = useState(initializedForm);
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthorized) {
			setErrors(isAuthorized);
		}
	}, [isAuthorized]);

	const errorList = errors.map((error) => (
		<li key={error}>{error}</li>
	));

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(event) {
		event.preventDefault();
		setErrors([]);
		setIsLoading(true);
		fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				setIsLoading(false);
				if (res.ok) {
					res.json().then((data) => {
						localStorage.setItem("jwt", data.token);
						onLogin(data.user);
						navigate("/");
					});
				} else {
					res.json().then((data) => setErrors(data.error));
				}
			});
	}

	return (
		<div className="login-container">
			<form className="login-form" onSubmit={handleSubmit}>
				<h1>Login</h1>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="username"
					value={formData.username}
					onChange={handleChange}
					
				/>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="password"
					value={formData.password}
					onChange={handleChange}
				/>
				<input type="submit" value={isLoading ? "Loading..." : "Sign In"} />

				<Link to="/signup">Create Account</Link>

				{errors.length > 0 ? (
					<ul>{errorList}</ul> 
				): null}

			</form>
		</div>
	);
}

export default Login;