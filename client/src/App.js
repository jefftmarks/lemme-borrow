import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login";
import Home from "./components/Home"

function App() {
	const [activeUser, setActiveUser] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3000/profile")
			.then((res) => {
				if (res.ok) {
					res.json().then((user) => setActiveUser(user))
				}
			})
	}, []);

	if (!activeUser) return <Login />;

  return (
    <div className="App">
      <Routes>
				<Route path="/" exact element={<Home />} />
			</Routes>
    </div>
  );
}

export default App;
