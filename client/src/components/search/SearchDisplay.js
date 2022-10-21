import React, { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "./SearchDisplay.css";

function SearchDisplay({ showSearch, setShowSearch, resetSearch, query, setQuery, onClickItem, activeUser }) {
	const [searchInput, setSearchInput] = useState("");
	const [showUsers, setShowUsers] = useState(true);
	const [users, setUsers] = useState([]);
	const [items, setItems] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	// ---------- Perform Search Based on Users or Items ----------

	useEffect(() => {
		setSearchInput(query);
		setisLoading(true);
		fetch(`/${showUsers ? "users" : "items"}/search/${activeUser.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query: query
			})
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						setisLoading(false);
						if (showUsers) {
							setUsers(data);
						} else {
							setItems(data);
						}
					});
				} else {
					res.json().then((users) => console.log(users));
				}
			});
	}, [query, activeUser, showUsers]);

	// ---------- Delayed Search on Input Change ----------

	useEffect(() => {
		const delayedSearch = setTimeout(() => {
			setQuery(searchInput);
		}, 500);

		return () => {
			clearTimeout(delayedSearch);
		} 
	}, [searchInput]);

	// ---------- Render Search Results ----------

	function renderSearchResults() {
		if (showUsers) {
			return (
				users.map((user) => (
					<Link
						key={user.id}
						onClick={onClickEx}
						to={`/user/${user.id}`}
					>
						<SearchResult
							result={user}
							type="user"
						/>
					</Link>
				))
			)
		} else {
			return (
				items.map((item) => (
					<SearchResult
						key={item.id}
						result={item}
						type="item"
						onClickResult={handleClickResult}
					/>
				))
			);
		}
	}


	// ---------- Show and Hide Search Modal ----------

	function onClickEx() {
		setUsers([]);
		setItems([]);
		resetSearch("");
		setShowSearch(false);
		setShowUsers(true);
	}
	
	function handleClickResult(id) {
		onClickEx();
		onClickItem(id);
	}

	if (!showSearch) {
		return null;
	}

	return (
		<div className="search-display">
			<div className="search-display-container">
				<div className="search-display-header">
					<h2>Search Results</h2>
					<span onClick={onClickEx}>X</span>
				</div>

				<div className="search-bar">
					<form>
						<input
							type="text"
							id="search-display-input"
							value={searchInput}
							placeholder="Search by User, Item Name or Tag"
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<button className="search-icon"><AiOutlineSearch/></button>
					</form>
					<div>
						<button
							className={`search-filter search-${showUsers}`}
							onClick={() => setShowUsers(true)}
						>
							Users
						</button>
						<button
							className={`search-filter search-${!showUsers}`}
							onClick={() => setShowUsers(false)}
						>
							Items
						</button>
					</div>
				</div>
				
				<div className="search-results">
					<div className="results-container">
						{isLoading ? "Loading . . ." : renderSearchResults()}
					</div>
				</div>

			</div>
		</div>
	);
}

export default SearchDisplay;