import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";
import "./Header.css";

function Header({ user, setUser, setShowSignup }) {

	function renderNavbar() {
		if (user) {
			return (
				<Nav
					user={user}
					setUser={setUser}
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
		<header id="header">
			<Link to="/"><h1>Logo</h1></Link>
			<div id="navbar">
				{renderNavbar()}
			</div>
		</header>
	);
}

export default Header;