import React from "react";
import { Link } from "react-router-dom";
import "./FeedCard.css"

function FeedCard({ item, onClickItem }) {

	const { id, image, name, owner } = item;

	return (
		<div className="feed-card">
			<img className="item-img"
				src={image}
				alt={name}
				onClick={() => onClickItem(id)}
			/>
			<div>
				<Link to={`user/${owner.id}`}>
					<img className="user-avatar" src={owner.avatar} alt="avatar" />
				</Link>
				<p>{owner.first_name}'s {name}</p>
			</div>
		</div>
	);
}

export default FeedCard;