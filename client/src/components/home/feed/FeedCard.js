import React from "react";
import "./FeedCard.css"

function FeedCard({ item, onClickItem }) {

	return (
		<div id="feed-card" onClick={() => onClickItem(item.id)}>
			<img src={item.image} alt={item.name} />
			<h2>{item.owner_first_name}'s {item.name}</h2>
		</div>
	);
}

export default FeedCard;