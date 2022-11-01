import React from "react";
import Feed from "./feed/Feed";
import Dashboard from "./dashboard/Dashboard";
import "./Home.css";

function Home({ onClickItem }) {
	return (
		<div className="home">
			<Dashboard
			/>
			<Feed
				onClickItem={onClickItem}
			/>
	</div>
	);
}

export default Home;