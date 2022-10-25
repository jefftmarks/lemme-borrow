import React from "react";
import Logo from "./borrow-logo.png";
import "./Welcome.css";

function Welcome() {
	return (
		<div className="welcome">
			<img src={Logo} alt="logo" />
			<div>
				<h1>lemmeBorrow</h1>
				<p>an app for giving, getting back, and keeping track of your belongings</p>
			</div>
		</div>
	);
}

export default Welcome;