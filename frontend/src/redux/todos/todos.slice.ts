import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TodosUiState = {
	filter: 'all' | 'completed' | 'active';
};

const initialState: TodosUiState = {
	filter: 'all'
};

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		setFilter(state, action: PayloadAction<TodosUiState['filter']>) {
			state.filter = action.payload;
		}
	}
});

export const { setFilter } = todosSlice.actions;

export default todosSlice.reducer;
