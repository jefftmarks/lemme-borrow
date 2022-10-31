import React from "react";
import { Link } from "react-router-dom";

import Login from "./Login";
import Nav from "./Nav";
import "./Header.css";
import Logo from "./borrow-logo.png";

function Header({ user, setUser, onSearch, setShowSignup }) {

	// ---------- Render Header ----------

	// Render navigation depending on whether user logged in or not
	function renderNavbar() {
		if (user) {
			return (
				<Nav
					user={user}
					setUser={setUser}
					onSearch={onSearch}
				/>
			)
		} else {
			return (
				<Login
					setUser={setUser}
					setShowSignup={setShowSignup}
				/>
			)
		}
	}

	return (
		<header className="header">
			<div className="logo">
				<Link to="/"><img src={Logo} alt="logo" /></Link>
				<h1>lemmeBorrow</h1>
			</div>
			{renderNavbar()}
		</header>
	);
}

export default Header;