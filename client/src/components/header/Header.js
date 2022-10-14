import React from "react";
import Login from "./Login";
import Nav from "./Nav";
import "./Header.css";

function Header({ user, setUser, setShowSignup }) {

	function renderNavbar() {
		if (user) {
			return (
				<Nav
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
			<div style={{border: "1px solid white"}}>
				<h1>Logo</h1>
			</div>
			<div id="navbar">
				{renderNavbar()}
			</div>
		</header>
	);
}

export default Header;