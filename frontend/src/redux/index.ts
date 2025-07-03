import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from './todos/todos.api';
import todosReducer from './todos/todos.slice';
import authReducer from './auth/auth.slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		todos: todosReducer,
		[todosApi.reducerPath]: todosApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
