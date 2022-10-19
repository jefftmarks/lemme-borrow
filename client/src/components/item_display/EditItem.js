import React, { useEffect, useState } from "react";
import "./EditItem.css";

function EditItem({ item, setShowItem }) {

	// ---------- Form Handling ----------

	const initialState = {
		name: item.name,
		image: item.image,
		description: item.description,
		tags: item.tags.join("; ") + ";"
	}

	const [formData, setFormData] = useState(initialState);
	const [tagCards, setTagCards] = useState([]);

	function handleChange(e) {
		const { value, name } = e.target;
		setFormData({...formData, [name]: value});
	}

	// ---------- Render Tag Cards to Confirm Correct Format ----------

	useEffect(() => {
		// Use setTimeout so there isn't "typewriter" effect
		const updateTagCards = setTimeout(() => {
		// remove semi-colons
		const arr = formData.tags.split(/\s*;\s*/gm);
		// filter out empty elements and grab first five
		const filteredArr = arr.filter((el) => el !== "").splice(0, 5);
		// add (lowercase) tags to a set to account for uniqueness
		const set = new Set();
		filteredArr.forEach((el) => set.add(el.toLowerCase()));
		// render tag cards
		setTagCards(Array.from(set));
		}, 300);

		return () => {
			clearTimeout(updateTagCards);
		}
	}, [formData.tags]);

	// ---------- Submit ----------

	function handleSubmit(e) {
		e.preventDefault();

		// If image left blank, use most current image
		if (formData.image === "") {
			setFormData({...formData, image: item.image});
		}

		fetch(`/items/${item.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...formData,
				tags: tagCards,
			}),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((item) => {
						setShowItem({item: item, mode: ""});
						setFormData(initialState);
					})
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}

	// ---------- Prevent Refresh ----------

	function onClickBack(e) {
		e.preventDefault();
		setShowItem({item: item, mode: ""});
	}

	return (
		<div className="edit-item">
			<div className="edit-item-header">
				<p>Edit Item</p>
				<button onClick={onClickBack}>
					Back
				</button>
			</div>
			<form className="edit-item-form" onSubmit={handleSubmit}>
				<label>Item Name:
					<input
					required
					type="text"
					name="name"
					onChange={handleChange}
					value={formData.name}
					/>
				</label>
				<label>Image:
					<input
					type="text"
					name="image"
					onChange={handleChange}
					value={formData.image}
					/>
				</label>
				<label>Description:
					<textarea
					name="description"
					rows="5"
					cols="29"
					onChange={handleChange}
					value={formData.description}
					>
					</textarea>
				</label>
				<label>Tags:
					<div className="edit-tags">
						<small>maximum five tags separated by a semi-colon ;</small>
						<small>tags must be unique</small>
						<small>example: book; sci-fi; used;</small>
						<textarea
						name="tags"
						rows="5"
						cols="29"
						onChange={handleChange}
						value={formData.tags}
						>
						</textarea>
					</div>
				</label>
				<div className="edit-tag-display">
					{tagCards.map((tag) => (
						<div className="tag-card" key={tag}>{tag}</div>
					))}
				</div>
				<button>Update Item</button>
			</form>
		</div>
	);
}

export default EditItem;