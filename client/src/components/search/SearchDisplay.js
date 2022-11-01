import React, { useState, useEffect, useContext } from "react";
import { ActiveUserContext } from "../../context/active_user";
import SearchResult from "./SearchResult";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import "./SearchDisplay.css";

function SearchDisplay({ showSearch, setShowSearch, query, setQuery, onClickItem }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [searchInput, setSearchInput] = useState("");
	const [users, setUsers] = useState([]);
	const [items, setItems] = useState([]);

	// ---------- Form Handling ----------

	function handleSubmit(e) {
		e.preventDefault();
		setQuery(searchInput);
	}

	// Perform search based on category: users or items
	useEffect(() => {
		if (showSearch.show) {
			setSearchInput(query)
			// Focus on search display form input (and blur search input in nav bar)
			document.getElementById("search-display-input").focus();
			// Request search results based on category
			fetch(`/${showSearch.mode === "users" ? "users" : "items"}/search/${activeUser.id}`, {
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
							if (showSearch.mode === "users") {
								setUsers(data);
							} else if (showSearch.mode === "items") {
								setItems(data);
							}
						});
					} else {
						res.json().then((users) => console.log(users));
					}
				});
		}
	}, [query, activeUser, showSearch]);

	// ---------- Debouncing: Delayed Search on Input Change ----------

	useEffect(() => {
		const delayedSearch = setTimeout(() => {
			setQuery(searchInput);
		}, 500);

		return () => {
			clearTimeout(delayedSearch);
		} 
	}, [searchInput, setQuery]);

	// ---------- Render Search Results ----------

	function renderSearchResults() {
		// Search by user
		if (showSearch.mode === "users" && users.length > 0) {
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
		// Search by item
		} else if (showSearch.mode === "items" && items.length > 0) {
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
		} else {
			return (
				<p style={{color: "var(--speed-cadet"}}>no results . . .</p>
			);
		}
	}


	// ---------- Show and Hide Search Modal ----------

	function onClickEx() {
		setUsers([]);
		setItems([]);
		setShowSearch({show: false, mode: ""});
	}
	
	function handleClickResult(id) {
		onClickEx();
		// Trigger item display modal
		onClickItem(id);
	}

	if (!showSearch.show) {
		return null;
	}

	return (
		<div className="search-display">
			<div className="search-display-container">
				<div className="search-display-header">
					<p>Search Results</p>
					<MdCancel
						onClick={onClickEx}
						size="27"
					/>
				</div>
				<div className="search-body">
					<div className="search-bar">
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								id="search-display-input"
								value={searchInput}
								placeholder={`search by ${showSearch.mode === "users" ? "user" : "item or tag"}`}
								onChange={(e) => setSearchInput(e.target.value)}
							/>
							<button className="search-icon">
								<AiOutlineSearch/>
							</button>
						</form>
						<div className="filter">
							<div className="filter-btns">
								<button
									className={`search-${showSearch.mode === "users"} ${showSearch.mode}`}
									onClick={() => setShowSearch({show: true, mode: "users"})}
								>
									Users
								</button>
								<button
									className={`search-${showSearch.mode === "items"} ${showSearch.mode}`}
									onClick={() => setShowSearch({show: true, mode: "items"})}
								>
									Items
								</button>
							</div>
							<div className="filter-bottom"></div>
						</div>
					</div>
					<div className="search-results">
						{renderSearchResults()}
					</div>

				</div>
			</div>
		</div>
	);
}

export default SearchDisplay;