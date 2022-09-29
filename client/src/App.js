import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
	const [user, setUser] = useState(null);
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
					handleLogout();
				}
			});
		}
	}, []);

	function handleLogout() {
		localStorage.clear();
		setUser(null);
		navigate("/login");
	}

  return (
    <div className="App">
			<NavBar onLogoutClick={handleLogout} user={user} />

      <Routes>
				<Route path="/signup" element={<Signup onLogin={setUser} />} />
				<Route path="/login" element={<Login onLogin={setUser} />} />
				<Route path="/" exact element={<Home user={user} />} />
			</Routes>
    </div>
  );
}

export default App;
