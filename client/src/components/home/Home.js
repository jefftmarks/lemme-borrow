import React from "react";
import Feed from "./feed/Feed";
import Dashboard from "./dashboard/Dashboard";
import "./Home.css";

function Home({ user, onClickItem }) {
	return (
		<div className="home">
			<Dashboard
				activeUser={user}
			/>
			<Feed
				activeUser={user}
				onClickItem={onClickItem}
			/>
	</div>
	);
}

export default Home;