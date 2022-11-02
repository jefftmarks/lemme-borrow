import React, { useEffect, useState, useContext } from "react";
import { ActiveUserContext } from "../../../context/active_user";
import FeedCard from "./FeedCard";
import "./Feed.css";

function Feed({ onClickItem }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [items, setItems] = useState([]);
	const [count, setCount] = useState(9);

	// ---------- Request 10 Most Recent Items ----------

	useEffect(() => {
		fetch(`/api/items/recent/${activeUser.id}/count/${count}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((items) => setItems(items));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}, [count, activeUser]);

	// ---------- Pagination ----------

	function handleIncrementCount() {
		setCount(count => count + 10)
	}

	return (
		<div className="feed">
			<div className="feed-container">
				<div className="feed-list">
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
		</div>
	);
}

export default Feed;