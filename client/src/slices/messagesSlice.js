import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessages = createAsyncThunk("messages/fetchMessage", (ticket_id) => {
	return fetch(`/messages/ticket/${ticket_id}`)
		.then((res) => res.json())
		.then((messages) => messages);
});

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    entities: [],
		status: "idle",
  },
  reducers: {
    messageAdded(state, action) {
      state.entities.unshift(action.payload);
    },
  },
	extraReducers: {
		[fetchMessages.pending](state) {
			state.status = "loading";
		},
		[fetchMessages.fulfilled](state, action) {
			state.entities = action.payload;
			state.status = "idle";
		},
	}
});

export const { messageAdded } = messagesSlice.actions;

export default messagesSlice.reducer;