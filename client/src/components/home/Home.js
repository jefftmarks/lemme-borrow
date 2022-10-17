import React from "react";
import Feed from "./feed/Feed";
import Dashboard from "./Dashboard";
import "./Home.css";

function Home({ user }) {
	return (
		<div id="home">
			<div id="home-container">
				<Dashboard />
				<Feed
					activeUser={user}
				/>
			</div>
	</div>
	);
}

export default Home;