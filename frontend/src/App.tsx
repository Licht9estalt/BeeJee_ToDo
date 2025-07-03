import { ConfigProvider, Layout, List, Checkbox, Button, Typography, Input, message } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import { RootState } from './redux';
import {
	useGetTodosQuery,
	useToggleTodoMutation,
	useDeleteTodoMutation,
	useChangeTodoMutation
	// useAddTodoMutation
} from './redux/todos/todos.api';
import { useSelector } from 'react-redux';
// import { useState } from 'react';

import { AddModal } from './AddModal';
import { LoginModal } from './LoginModal';
import { useState } from 'react';

const { Title, Text } = Typography;

export const App = () => {
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editText, setEditText] = useState('');

	const { data: todos = [], isLoading } = useGetTodosQuery();
	const [toggleTodo] = useToggleTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();
	const [changeTodo] = useChangeTodoMutation();
	// const [addTodo] = useAddTodoMutation();
	const filter = useSelector<RootState>((state) => state.todos.filter);
	const isAdmin = useSelector<RootState>((state) => state.auth.isAdmin);
	const [messageApi, contextHolder] = message.useMessage();

	const filteredTodos = todos.filter((todo) => {
		if (filter === 'completed') return todo.completed;
		if (filter === 'active') return !todo.completed;
		return true;
	});

	const startEditing = (id: number, text: string) => {
		setEditingId(id);
		setEditText(text);
	};

	const saveEdit = async () => {
		if (!editingId || !editText.length) return;
		try {
			// await fetch(`/api/todos/${editingId}`, {
			// 	method: 'PATCH',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({ title: editText })
			// });
			await changeTodo({ id: editingId, title: editText }).unwrap();
			messageApi.open({
				type: 'success',
				content: 'Задача обновлена'
			});
		} catch {
			messageApi.open({
				type: 'success',
				content: 'Ошибка при обновлении'
			});
		} finally {
			setEditingId(null);
			setEditText('');
		}
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<ConfigProvider locale={ruRU}>
				<Layout>
					{contextHolder}
					<Title>Список задач</Title>
					<LoginModal />
					<AddModal />
					<List
						itemLayout='horizontal'
						dataSource={filteredTodos}
						renderItem={(todo) => (
							<List.Item
								actions={[
									isAdmin ? (
										<Button danger size='small' onClick={() => deleteTodo(todo.id)}>
											Удалить
										</Button>
									) : (
										<></>
									)
								]}
							>
								{isAdmin ? (
									<Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} style={{ marginRight: 8 }} />
								) : (
									todo.completed && <span style={{ marginRight: 8 }}>✅</span>
								)}
								{editingId === todo.id ? (
									<>
										<Input
											value={editText}
											onChange={(e) => setEditText(e.target.value)}
											onPressEnter={saveEdit}
											onBlur={saveEdit}
											style={{ width: 300 }}
										/>
									</>
								) : (
									<Text>
										{todo.title}
										{isAdmin ? (
											<Button size='small' type='link' onClick={() => startEditing(todo.id, todo.title)}>
												✏️
											</Button>
										) : (
											<></>
										)}
									</Text>
								)}
								<Text italic type='secondary'>
									{todo.name}, {todo.email}
								</Text>
								<Button danger onClick={() => deleteTodo(todo.id)}>
									🗑
								</Button>
							</List.Item>
						)}
					/>
				</Layout>
			</ConfigProvider>
		</>
	);
};

export default App;
