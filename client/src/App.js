import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Dashboard/Home";
import NavBar from "./components/NavBar";
import SignupForm from "./components/Login/SignupForm";
import LoginForm from "./components/Login/LoginForm";

function App() {
	const [user, setUser] = useState(null);
	const [isAuthorized, setIsAuthorized] = useState(null);
	
	const navigate = useNavigate();

	useEffect(() => {
		let token = localStorage.getItem("jwt");

		if (!token) navigate("/signup");

		if (token && !user) {
			fetch("/profile", {
				headers: {
					token: token,
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				if (res.ok) {
					res.json().then((user) => setUser(user));
				} else {
					res.json().then((data) => handleLogout(data))
				}
			});
		}
	}, []);

	function handleLogout(data) {
		localStorage.clear();
		setUser(null);
		navigate("/login");
		setIsAuthorized(data.error);
	}

  return (
    <div className="App">
			<NavBar onLogoutClick={handleLogout} user={user} />

      <Routes>
				<Route path="/signup" element={<SignupForm onLogin={setUser} setIsAuthorized={setIsAuthorized} />} />
				<Route path="/login" element={<LoginForm onLogin={setUser} isAuthorized={isAuthorized} />} />
				<Route path="/" exact element={<Home user={user} />} />
			</Routes>
    </div>
  );
}

export default App;
