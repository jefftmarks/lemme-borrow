import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ActiveUserContext } from "./context/active_user";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Welcome from "./components/welcome/Welcome";
import SignUp from "./components/welcome/SignUp";
import ItemDisplay from "./components/item_display/ItemDisplay";
import SearchDisplay from "./components/search/SearchDisplay";
import Profile from "./components/profile/Profile";
import Ticket from "./components/ticket/Ticket";
import About from "./components/welcome/About";

function App() {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [isLoading, setIsLoading] = useState(true);

	// Modals
	const [showSignup, setShowSignup] = useState(false);
	const [showItem, setShowItem] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [query, setQuery] = useState("");

	// ---------- Render Active User on Reload ----------

	// Grab active user via JWT token stored in local storage
	useEffect(() => {
		const token = localStorage.getItem("jwt");
		if (token && !activeUser) {
			fetch("/api/profile", {
				headers: {
					token: token,
					"Content-Type": "application/json"
				}
			})
			.then((res) => {
				if (res.ok) {
					res.json().then((activeUser) => {
						setActiveUser(activeUser);
						setIsLoading(false);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
		} else {
			setIsLoading(false);
		}
	}, [activeUser]);

	// If active user, render home dashboard. Otherwise, load welcome page with login/signup.
	function renderElement() {
		return activeUser ? (
			<Home
				onClickItem={handleClickItem}
			/>
		) : <Welcome />;
	}

	// ---------- Render Item Display ----------

	// When item clicked (on feed or on cupboard page), fetch item and display item modal.
	function handleClickItem(id) {
		setShowItem(true);
		fetch(`/api/items/${id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((item) => {
						// showItem state stores payload of item and mode. Mode determines display (show, edit, add)
						setShowItem({item: item, mode: ""});
					});
				} else {
					// User clicks on item but owner may have deleted
					res.json().then((data) => alert(data.error));
				}
			});
	}

	// ---------- Render Search Display ----------

	function handleSearch(searchInput) {
		if (searchInput !== "") {
			// showSearch state stores payload of boolean to display modal and mode, which determines whether default search category will be "users" or "items"
			setShowSearch({show: true, mode: "users"});
			setQuery(searchInput);
			// Blur nav search input (and focus on input in SearchDisplay modal)
			document.getElementById("nav-search-input").blur();
		}
	}

	// ---------- Render App ----------

	if (isLoading) {
		return null;
	}

  return (
    <div className="App">

			 {/* ---------- Modals ========== */}

			<ItemDisplay
				setShowItem={setShowItem}
				showItem={showItem}
				setShowSearch={setShowSearch}
				setQuery={setQuery}
			/>
			<SearchDisplay
				showSearch={showSearch}
				setShowSearch={setShowSearch}
				query={query}
				setQuery={setQuery}
				onClickItem={handleClickItem}
			/>
			<SignUp
				showSignup={showSignup}
				setShowSignup={setShowSignup}
			/>

			{/* ---------- Nav ========== */}

			<Header
				setShowSignup={setShowSignup}
				onSearch={handleSearch}
			/>

			{/* ---------- Routes ========== */}

			<Routes>
				<Route path="/about" element={<About/>} />
				<Route
					path="/user/:user_id"
					element={activeUser ? (
						<Profile
							onClickItem={handleClickItem}
							onClickAddItem={() => setShowItem({item: true, mode: "add"})}
						/>
					) : null}
				/>
				<Route
					path="/ticket/:ticket_id"
					element={
						<Ticket/>
					}
				/>
				<Route exact path="/" element={renderElement()}
				/>
			</Routes>
    </div>
  );
}

export default App;
