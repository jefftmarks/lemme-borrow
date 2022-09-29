import React from "react";

function NavBar({ onLogoutClick, user }) {
	return (
		<div>
			{ user ? <button onClick={onLogoutClick}>Log Out</button> : null}
		</div>
	)
}

export default NavBar;