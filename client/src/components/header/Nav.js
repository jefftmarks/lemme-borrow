import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav({ user, setUser }) {

	const navigate = useNavigate();

	function handleLogout() {
		sessionStorage.clear();
		setUser(null);
		navigate("/");
	}

	return (
		<div id="nav">
			<Link to={`/user/${user.id}`}>Profile</Link>
			<button onClick={handleLogout}>Sign Out</button>
		</div>
	);
}

export default Nav;