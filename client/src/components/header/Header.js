import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";
import "./Header.css";

function Header({ user, setUser, onSearch, setShowSignup }) {

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
			<Link to="/"><h1>Logo</h1></Link>
			{renderNavbar()}
		</header>
	);
}

export default Header;