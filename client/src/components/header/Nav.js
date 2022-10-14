import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav({ user, setUser }) {

	function handleLogout() {
		localStorage.clear();
		setUser(null);
	}

	return (
		<div id="nav">
			<Link to={`/user/${user.id}`}>Profile</Link>
			<button onClick={handleLogout}>Sign Out</button>
		</div>
	);
}

export default Nav;