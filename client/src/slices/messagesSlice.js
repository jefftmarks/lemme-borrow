import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessages = createAsyncThunk("messages/fetchMessage", (ticket_id) => {
	return fetch(`/api/messages/ticket/${ticket_id}`)
		.then((res) => res.json())
		.then((messages) => messages);
});

export const messageAdded = createAsyncThunk("messages/messageAdded", (message) => {
	return fetch("/api/messages/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	})
		.then((res) => res.json())
		.then((message) => message);
});

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    entities: [],
		status: "idle",
  },
	extraReducers: {
		[fetchMessages.pending](state) {
			state.status = "loading";
		},
		[fetchMessages.fulfilled](state, action) {
			state.entities = action.payload;
			state.status = "idle";
		},
		[messageAdded.pending](state) {
			state.status = "loading";
		},
		[messageAdded.fulfilled](state, action) {
			state.entities.unshift(action.payload);
		},
	}
});

export default messagesSlice.reducer;