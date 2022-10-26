import React from "react";
import Logo from "./borrow-logo.png";
import "./Welcome.css";

function Welcome() {
	return (
		<div className="welcome">
			<div className="welcome-card">
				<img src={Logo} alt="logo" />
				<div className="welcome-text">
					<h1>lemmeBorrow</h1>
					<p className="two-line">an app for giving, getting back,<br/>and keeping track of your belongings</p>
				</div>
			</div>
		</div>
	);
}

export default Welcome;