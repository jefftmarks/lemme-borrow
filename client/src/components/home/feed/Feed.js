import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import "./Feed.css";

function Feed({ activeUser, onClickItem }) {
	const [items, setItems] = useState([]);
	const [count, setCount] = useState(9);

	useEffect(() => {
		fetch(`/items/recent/${activeUser.id}/count/${count}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((items) => setItems(items));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}, [count, activeUser]);

	function handleIncrementCount() {
		setCount(count => count + 10)
	}

	return (
		<div id="feed">
			<div id="feed-header">
				<h1>New Items From Your Friends</h1>
			</div>
			<div id="feed-list">
				{items.map((item) => (
					<FeedCard
						key={item.id}
						item={item}
						onClickItem={onClickItem}
						
					/>
				))}
				{items.length < 1 || items.length % 10 !== 0 ? null : (
					<button onClick={handleIncrementCount}>
						Show More
					</button>
				)}
			</div>
		</div>
	);
}

export default Feed;