import React, { useState, useEffect } from "react";
import CupboardCard from "./CupboardCard";
import CupboardSearch from "./CupboardSearch";
import "./Cupboard.css";

function Cupboard({ profile, onClickItem }) {
	const [items, setItems] = useState([]);
	const [total, setTotal] = useState("");
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState("newest")
	const [searchInput, setSearchInput] = useState("");
	const [query, setQuery] = useState("");

	// ---------- Debouncing: Delayed Search on Input Change ----------

	useEffect(() => {
		const delayedSearch = setTimeout(() => {
			setSort("newest");
			setQuery(searchInput);
		}, 500);

		return () => {
			clearTimeout(delayedSearch);
		} 
	}, [searchInput]);

	// ---------- Grab 20 Items at a Time Per Search Conditions ----------

	useEffect(() => {
		fetch(`/api/items/belongings/${profile.user.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// Pass along search conditions to back end
				count: count,
				sort: sort,
				query: query,
			}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						setItems(data.items);
						setTotal(data.total);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}, [profile, count, sort, query]);

	return (
		<div className="cupboard">
			<CupboardSearch
				count={count}
				setCount={setCount}
				sort={sort}
				setSort={setSort}
				setQuery={setQuery}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				itemsLength={items.length}
				total={total}
			/>
			<div className="items-container">
			{items.map((item) => (
				<CupboardCard
					key={item.id}
					item={item}
					onClickItem={onClickItem}
				/>
			))}
			</div>
		</div>
	);
}

export default Cupboard;