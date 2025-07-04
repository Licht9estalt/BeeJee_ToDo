import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Todo = {
	id: number;
	title: string;
	name: string;
	email: string;
	completed: boolean;
	edited: boolean;
};

export const todosApi = createApi({
	reducerPath: 'todosApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://todo-licht9estalt.amvera.io/' }),
	tagTypes: ['Todos'],
	endpoints: (builder) => ({
		getTodos: builder.query<
			{ todos: Todo[]; total: number; page: number },
			{ page?: number; limit?: number; sortBy?: string; order?: string } | void
		>({
			query: (params) => {
				const query = new URLSearchParams();

				if (params) {
					if (params.page) query.set('page', params.page.toString());
					if (params.limit) query.set('limit', params.limit.toString());
					if (params.sortBy) query.set('sortBy', params.sortBy);
					if (params.order) query.set('order', params.order);
				}

				return `todos?${query.toString()}`;
			},
			providesTags: ['Todos']
		}),
		addTodo: builder.mutation<Todo, Pick<Todo, 'name' | 'email' | 'title'>>({
			query: (body) => ({
				url: 'todos',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Todos']
		}),
		changeTodo: builder.mutation<Todo, { id: number; title: string }>({
			query: ({ id, title }) => ({
				url: `todos/${id}/edit`,
				method: 'PATCH',
				body: {
					title
				}
			}),
			invalidatesTags: ['Todos']
		}),
		toggleTodo: builder.mutation<Todo, { id: number; completed: boolean }>({
			query: ({ id, completed }) => ({
				url: `todos/${id}/toggle`,
				method: 'PATCH',
				body: {
					completed
				}
			}),
			invalidatesTags: ['Todos']
		})
	})
});

export const { useGetTodosQuery, useAddTodoMutation, useChangeTodoMutation, useToggleTodoMutation } = todosApi;
