import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "./Nav.css";

// ---------- Nav Bar: User Logged In ----------

function Nav({ user, setUser, onSearch }) {
	const [searchInput, setSearchInput] = useState("");

	// ---------- Logout ----------

	const navigate = useNavigate();

	function handleLogout() {
		// Clear JWT token
		localStorage.clear();
		setUser(null);
		navigate("/");
	}

	// ---------- Search ----------

	// Trigger search modal
	function handleSubmit(e) {
		e.preventDefault();
		onSearch(searchInput);
		setSearchInput("");
	}

	return (
		<div className="nav">
			<div className="nav-links">
				<Link to={"/"}>Dashboard</Link>
				<Link to={`/user/${user.id}`}>Cupboard</Link>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					id="nav-search-input"
					type="text"
					value={searchInput}
					placeholder="search by user, item name or tag"
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<button><AiOutlineSearch/></button>
			</form>
			<button className="signout" onClick={handleLogout}>Sign Out</button>
		</div>
	);
}

export default Nav;