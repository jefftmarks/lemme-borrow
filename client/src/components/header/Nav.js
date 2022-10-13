import React from "react";
import "./Nav.css";

function Nav({ setUser }) {

	function handleLogout() {
		localStorage.clear();
		setUser(null);
	}

	return (
		<div id="nav">
			<button onClick={handleLogout}>Sign Out</button>
		</div>
	);
}

export default Nav;