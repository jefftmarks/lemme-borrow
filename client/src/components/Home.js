import React from "react";

function Home({ user }) {

	if (!user) return <h1>Loading...</h1>

	return (
		<div>
			<h1>{user.username}</h1>
		</div>
	)
}

export default Home;