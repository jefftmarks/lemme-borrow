import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup({ onLogin }) {
	const initializedForm = { username: "", password: "", password_confirmation: ""};
	const [formData, setFormData] = useState(initializedForm);
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value});
	}

	const errorList = errors.map((error) => (
		<li key={error}>{error}</li>
	));

	function handleSubmit(event) {
		event.preventDefault();
		setErrors([]);
		setIsLoading(true);
		fetch("/users", {
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
					res.json().then((data) => setErrors(data.errors));
				}
			});
	}

	return (
		<div className="signup-container">
			<form className="signup-form" onSubmit={handleSubmit}>
				<h1>Signup</h1>
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
				<input
					type="password"
					id="password_confirmation"
					name="password_confirmation"
					placeholder="confirm password"
					value={formData.password_confirmation}
					onChange={handleChange}
				/>
				<input type="submit" value={isLoading ? "Loading..." : "Sign Up"} />

				Already have an account? <Link to="/login">Login</Link>

				{errors.length > 0 ? (
					<ul>{errorList}</ul> 
				): null}

			</form>
		</div>
	);
}

export default Signup;