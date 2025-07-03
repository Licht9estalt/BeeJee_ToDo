import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
	isAdmin: boolean;
};

const initialState: AuthState = {
	isAdmin: false
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginAsAdmin: (state) => {
			state.isAdmin = true;
		},
		logout: (state) => {
			state.isAdmin = false;
		}
	}
});

export const { loginAsAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
