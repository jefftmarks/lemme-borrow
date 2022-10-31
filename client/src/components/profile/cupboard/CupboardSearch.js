import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./CupboardSearch.css";

function CupboardSearch({ total, count, setCount, sort, setSort, setQuery, searchInput, setSearchInput, itemsLength}) {

	// ---------- Form Handling ----------

	function handleSubmit(e) {
		e.preventDefault();
		setSort("newest");
		setQuery(searchInput);
	}

	function onClickClear() {
		setSort("newest");
		setQuery("");
		setSearchInput("");
	}

	return (
		<div className="cupboard-nav">
			<div className={`cupboard-pagination hide-${total <= 20}`}>
				{itemsLength === 0 ? "No Items" : (
					<p>{count + 1}-{count + itemsLength} of {total}</p>
				)}
				{total <= 20 ? null : (
					<div>
						<button
							onClick={() => setCount(count => count - 20)}
							disabled={count === 0}
						>
							Prev
						</button>
						<button
							onClick={() => setCount(count => count + 20)}
							disabled={itemsLength < 20 || count + itemsLength === total}
						>
							Next
						</button>
					</div>
				)}
			</div>
			<div className="cupboard-search">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={searchInput}
						placeholder="search by name or tag"
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<button className="search-icon"><AiOutlineSearch/></button>
				</form>
				<button
					className="clear"
					onClick={onClickClear}>
						Clear Search
				</button>
			</div>
			<select
				className="cupboard-sort"
				name="sort"
				value={sort}
				onChange={(e) => setSort(e.target.value)}
			>
				<option value="newest">Newest to Oldest</option>
				<option value="oldest">Oldest to Newest</option>
			</select>
		</div>
	);
}

export default CupboardSearch;