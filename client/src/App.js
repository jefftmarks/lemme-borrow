import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Welcome from "./components/welcome/Welcome";
import SignUp from "./components/welcome/SignUp";
import ItemDisplay from "./components/item_display/ItemDisplay";
import SearchDisplay from "./components/search/SearchDisplay";
import Profile from "./components/profile/Profile";
import Ticket from "./components/ticket/Ticket";

function App() {
	const [user, setUser] = useState(null);

	const [showSignup, setShowSignup] = useState(false);

	const [showItem, setShowItem] = useState(false);

	const [showSearch, setShowSearch] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [query, setQuery] = useState("");

	const [isLoading, setIsLoading] = useState(true);

	// ---------- Render Active User on Reload ----------

	// Grab active user via JWT token stored in local storage
	useEffect(() => {
		let token = sessionStorage.getItem("jwt");
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
						setIsLoading(false);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
		} else {
			setIsLoading(false);
		}
	}, [user]);

	// Render home dashboard if active user, otherwise load welcome page
	function renderElement() {
		return user ? (
			<Home
				user={user}
				onClickItem={handleClickItem}
			/>
		) : <Welcome />;
	}

	// ---------- Render Item Display ----------

	function handleClickItem(id) {
		setShowItem(true);
		fetch(`/items/${id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((item) => {
						setShowItem({item: item, mode: ""});
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}

	// ---------- Render Search Display ----------

	useEffect(() => {
		if (searchInput !== "") {
			const delayedSearch = setTimeout(() => {
				setShowSearch(true);
				setQuery(searchInput);
				document.getElementById("nav-search-input").blur();
				document.getElementById("search-display-input").focus();
			}, 500);
	
			return () => {
				clearTimeout(delayedSearch);
			}
		}
	}, [searchInput]);

	if (isLoading) {
		return null;
	}

  return (
    <div className="App">
			<ItemDisplay
				setShowItem={setShowItem}
				showItem={showItem}
				activeUser={user}
			/>
			<SearchDisplay
				showSearch={showSearch}
				setShowSearch={setShowSearch}
				resetSearch={setSearchInput}
				query={query}
				setQuery={setQuery}
				activeUser={user}
				onClickItem={handleClickItem}
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
				searchInput={searchInput}
				setSearchInput={setSearchInput}
			/>
			<Routes>
				<Route
					path="/user/:user_id"
					element={user ? (
						<Profile
							activeUser={user}
							setActiveUser={setUser}
							onClickItem={handleClickItem}
							onClickAddItem={() => setShowItem({item: true, mode: "add"})}
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
