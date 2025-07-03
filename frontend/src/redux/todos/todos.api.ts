import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
	id: number;
	title: string;
	name: string;
	email: string;
	completed: boolean;
}

export const todosApi = createApi({
	reducerPath: 'todosApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
	tagTypes: ['Todos'],
	endpoints: (builder) => ({
		getTodos: builder.query<Todo[], void>({
			query: () => 'todos',
			providesTags: ['Todos']
		}),
		addTodo: builder.mutation<Todo, Partial<Todo>>({
			query: (body) => ({
				url: 'todos',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Todos']
		}),
		toggleTodo: builder.mutation<Todo, number>({
			query: (id) => ({
				url: `todos/${id}/toggle`,
				method: 'PATCH'
			}),
			invalidatesTags: ['Todos']
		}),
		changeTodo: builder.mutation<Todo, { id: number; title: string }>({
			query: ({ id, title }) => ({
				url: `todos/${id}`,
				method: 'PATCH',
				body: {
					title
				}
			}),
			invalidatesTags: ['Todos']
		}),
		deleteTodo: builder.mutation<void, number>({
			query: (id) => ({
				url: `todos/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Todos']
		})
	})
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useToggleTodoMutation,
	useChangeTodoMutation,
	useDeleteTodoMutation
} = todosApi;
