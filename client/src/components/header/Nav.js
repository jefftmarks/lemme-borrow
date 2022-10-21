import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "./Nav.css";

function Nav({ user, setUser, searchInput, setSearchInput }) {

	// ---------- Logout ----------

	const navigate = useNavigate();

	function handleLogout() {
		sessionStorage.clear();
		setUser(null);
		navigate("/");
	}

	return (
		<div className="nav">

			<div className="nav-btns">
				<Link to={"/"}>Dashboard</Link>
				<Link to={`/user/${user.id}`}>Profile</Link>
				<button onClick={handleLogout}>Sign Out</button>
			</div>

			<div className="nav-search">
				<form>
				<input
					id="nav-search-input"
					type="text"
					value={searchInput}
					placeholder="Search by User, Item Name or Tag"
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<button className="search-icon"><AiOutlineSearch/></button>
				</form>
			</div>
		</div>
	);
}

export default Nav;