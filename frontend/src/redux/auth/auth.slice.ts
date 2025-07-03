import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
	isAdmin: boolean;
};

const initialState: AuthState = {
	//   isAdmin: localStorage.getItem('isAdmin') === 'true',
	isAdmin: false
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginAsAdmin: (state) => {
			state.isAdmin = true;
			//   localStorage.setItem('isAdmin', 'true')
		},
		logout: (state) => {
			state.isAdmin = false;
			//   localStorage.removeItem('isAdmin')
		}
	}
});

export const { loginAsAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
