import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import "./Feed.css";

function Feed({ activeUser }) {
	const [items, setItems] = useState([]);
	const [count, setCount] = useState(0);

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
		setCount(count => count + 20)
	}

	function handleDecrementCount() {
		setCount(count => count - 20)
	}

	return (
		<div id="feed">
			<div id="feed-header">
				<button
					id="feed-prev"
					onClick={handleDecrementCount}
					className={count === 0 ? "feed-hide" : "feed-show"}
					disabled={count === 0}
				>
					Previous
				</button>
				<h1>What's in Your Cupboard? New Items From Your Friends</h1>
				<button
					id="feed-next"
					onClick={handleIncrementCount}
					className={items.length < 20 ? "feed-hide" : "feed-show"}
					disabled={items.length < 20}
				>
					Show More
				</button>
			</div>
			<div id="feed-list">
				{items.map((item) => (
					<FeedCard
						key={item.id}
						item={item}
					/>
				))}
			</div>
		</div>
	);
}

export default Feed;