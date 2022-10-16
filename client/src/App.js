import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Welcome from "./components/welcome/Welcome";
import SignUp from "./components/welcome/SignUp";
import ItemDisplay from "./components/item_display/ItemDisplay";
import Profile from "./components/profile/Profile";
import Ticket from "./components/ticket/Ticket";

function App() {
	const [user, setUser] = useState(null);
	const [showSignup, setShowSignup] = useState(false);
	const [item, setItem] = useState(null);
	const [mode, setMode] = useState("");

	// ---------- Render Active User on Reload ----------

	useEffect(() => {
		// Grab active via JWT token stored in local storage
		let token = localStorage.getItem("jwt");
		if (token && !user) {
			fetch("/profile", {
				headers: {
					token: token,
					"Content-Type": "application/json"
				}
			})
			.then((res) => {
				if (res.ok) {
					res.json().then((user) => {
						setUser(user);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
		}
	}, [user]);

	// Render element for home path depending on whether or not user is logged in
	function renderElement() {
		return user ? <Home user={user}/> : <Welcome />;
	}

	// ---------- Render Display Item ----------

	function handleClickItem(id) {
		fetch(`/items/${id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((item) => {
						setItem(item);
						setMode("");
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}

  return (
    <div className="App">
			<ItemDisplay
				item={item}
				setItem={setItem}
				mode={mode}
				setMode={setMode}
				activeUser={user}
			/>
			<SignUp
				showSignup={showSignup}
				setShowSignup={setShowSignup}
				setUser={setUser}
			/>
			<Header
				user={user}
				setUser={setUser}
				setShowSignup={setShowSignup}
			/>
			<Routes>
				<Route
					path="/user/:user_id"
					element={user ? (
						<Profile
							activeUser={user}
							setActiveUser={setUser}
							onClickItem={handleClickItem}
							onClickAddItem={() => setItem({mode: "add"})}
						/>
					) : null}
				/>
				<Route
					path="/ticket/:ticket_id"
					element={
						<Ticket
							activeUser={user}
						/>
					}
				/>
				<Route exact path="/" element={renderElement()}
				/>
			</Routes>
    </div>
  );
}

export default App;
