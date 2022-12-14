import React, { useEffect, useState } from "react";
import "./EditItem.css";

function EditItem({ item, setShowItem }) {

	// ---------- Form Handling ----------

	const initialState = {
		name: item.name,
		image: item.image,
		description: item.description,
		// Reformat tags for proper display
		tags: item.tags.join("; ") + ";"
	}

	const [formData, setFormData] = useState(initialState);
	const [tagCards, setTagCards] = useState([]);

	function handleChange(e) {
		const { value, name } = e.target;
		setFormData({...formData, [name]: value});
	}

	// ---------- Format Tag Cards ----------

	useEffect(() => {
		// Use setTimeout so there isn't "typewriter" effect
		const updateTagCards = setTimeout(() => {
		// Remove semi-colons
		const arr = formData.tags.split(/\s*;\s*/gm);
		// Filter out empty elements and grab first five
		const filteredArr = arr.filter((el) => el !== "").splice(0, 5);
		// Add lowercase tags to a set to account for uniqueness
		const set = new Set();
		filteredArr.forEach((el) => set.add(el.toLowerCase()));
		// Render tag cards
		setTagCards(Array.from(set));
		}, 300);

		return () => {
			clearTimeout(updateTagCards);
		}
	}, [formData.tags]);

	// ---------- Submit Edited Item ----------

	function handleSubmit(e) {
		e.preventDefault();
		// If image left blank, use most current image
		if (formData.image === "") {
			setFormData({...formData, image: item.image});
		}
		fetch(`/api/items/${item.id}`, {
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
						// Hide modal
						setShowItem({item: item, mode: ""});
						setFormData(initialState);
					})
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}


	return (
		<div className="edit-item">
			<div className="edit-item-header">
				<p>Edit Item</p>
				<button onClick={() => setShowItem({item: item, mode: ""})}>
					Back
				</button>
			</div>
			<form onSubmit={handleSubmit}>
				<label><p>Item Name:</p>
					<input
					required
					type="text"
					name="name"
					onChange={handleChange}
					value={formData.name}
					/>
				</label>
				<label><p>Image:</p>
					<input
					type="text"
					name="image"
					onChange={handleChange}
					value={formData.image}
					/>
				</label>
				<label><p>Description:</p>
					<textarea
					name="description"
					rows="5"
					onChange={handleChange}
					value={formData.description}
					>
					</textarea>
				</label>
				<label className="tags-label"><p>Tags:</p>
					<div className="edit-tags">
						<div className="instructions">
							<p>maximum five tags separated by a semi-colon</p>
							<p>tags must be unique</p>
							<p>book; sci-fi; used;</p>
						</div>
						<textarea
						name="tags"
						rows="2"
						onChange={handleChange}
						value={formData.tags}
						>
						</textarea>
						<div className="tag-display">
							{tagCards.map((tag) => (
								<p key={tag}>{tag}</p>
							))}
						</div>
					</div>
				</label>
				<button className="update-item-btn">Update Item</button>
			</form>
		</div>
	);
}

export default EditItem;