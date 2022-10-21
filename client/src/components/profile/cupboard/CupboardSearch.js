import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./CupboardSearch.css";

function CupboardSearch({ total, count, setCount, sort, setSort, setQuery, searchInput, setSearchInput, itemsLength}) {

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
			<div className="cupboard-pagination">
					Displaying {count + 1}-{count + itemsLength} of {total}
					<button
						onClick={() => setCount(count => count - 20)}
						disabled={count === 0}
					>
						Prev
					</button>
					<button
						onClick={() => setCount(count => count + 20)}
						disabled={itemsLength < 20 || count + itemsLength === total }
					>
						Next
					</button>
			</div>
			<div className="cupboard-search">
				<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={searchInput}
					placeholder="Search by Name or Tag"
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<button className="search-icon"><AiOutlineSearch/></button>
				</form>
				<button onClick={onClickClear}>Clear Search</button>
			</div>
			<div className="cupboard-sort">
				<select
					name="sort"
					value={sort}
					onChange={(e) => setSort(e.target.value)}
				>
					<option value="newest">Newest to Oldest</option>
					<option value="oldest">Oldest to Newest</option>
				</select>
			</div>
		</div>
	);
}

export default CupboardSearch;