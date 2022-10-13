import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Welcome from "./components/welcome/Welcome";
import SignUp from "./components/welcome/SignUp";

function App() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showSignup, setShowSignup] = useState(false);

	// Grab active user on reload via JWT token stored in local storage
	useEffect(() => {
		let token = localStorage.getItem("jwt");
		if (token && !user) {
			setIsLoading(true);
			fetch("/profile", {
				headers: {
					token: token,
					"Content-Type": "application/json"
				}
			})
			.then((res) => {
				setIsLoading(false);
				if (res.ok) {
					res.json().then((user) => {
						setUser(user);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
		}
	}, []);

	// Render element for home path depending on whether or not user is logged in
	function renderElement() {
		if (isLoading) {
			return <h2>Loading...</h2>;
		} else if (user) {
			return (
				<Home
					user={user}
				/>
			);
		} else {
			return (
				<Welcome />
			);
		}
	}

  return (
    <div className="App">
			<SignUp
				showSignup={showSignup}
				setShowSignup={setShowSignup}
				setUser={setUser}
			/>
			<Header
				user={user}
				setUser={setUser}
				setIsLoading={setIsLoading}
				setShowSignup={setShowSignup}
			/>
			<Routes>
				<Route exact path="/" element={renderElement()} />
			</Routes>
    </div>
  );
}

export default App;
