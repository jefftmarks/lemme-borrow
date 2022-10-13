import React from "react";

function Home({ user }) {
	return (
		<div id="home">
			<h1>Home</h1>
			<p>Hi {user.first_name}</p>
		</div>
	);
}

export default Home;