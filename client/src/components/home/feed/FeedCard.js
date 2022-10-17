import React from "react";
import "./FeedCard.css"

function FeedCard({ item }) {

	return (
		<div id="feed-card">
			<div id="feed-card-image"
				style={{backgroundImage: `url("${item.image}")`}}
			>
			</div>
			<h2>{item.owner_first_name}'s {item.name}</h2>
		</div>
	);
}

export default FeedCard;