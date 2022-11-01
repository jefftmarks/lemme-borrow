import React, { useContext} from "react";
import { ActiveUserContext } from "../../context/active_user";
import { Link } from "react-router-dom";
import Login from "./Login";
import Nav from "./Nav";
import "./Header.css";
import Logo from "./borrow-logo.png";

function Header({ onSearch, setShowSignup }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);

	// ---------- Render Header ----------

	// Render navigation depending on whether user logged in or not
	function renderNavbar() {
		if (activeUser) {
			return (
				<Nav
					onSearch={onSearch}
				/>
			)
		} else {
			return (
				<Login
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