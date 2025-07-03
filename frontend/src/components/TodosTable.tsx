import { usePagination } from '@/hooks/usePagination';
import { RootState } from '@/redux';
import { Todo, useChangeTodoMutation, useGetTodosQuery, useToggleTodoMutation } from '@/redux/todos/todos.api';
import { Button, Checkbox, Input, message, Table, Typography } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const { Text } = Typography;

export const TodosTable = () => {
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editText, setEditText] = useState('');
	const [messageApi, contextHolder] = message.useMessage();
	const { page, limit, sortBy, order, setPage, setSortBy, toggleOrder } = usePagination();

	const isAdmin = useSelector<RootState>((state) => state.auth.isAdmin);
	const { data, isLoading } = useGetTodosQuery({ page, limit, sortBy, order }, { refetchOnMountOrArgChange: true });
	const [changeTodo] = useChangeTodoMutation();
	const [toggleTodo] = useToggleTodoMutation();

	const saveEdit = async () => {
		if (!editingId || !editText.length) return;
		try {
			await changeTodo({ id: editingId, title: editText }).unwrap();
			messageApi.open({
				type: 'success',
				content: 'Задача обновлена'
			});
		} catch {
			messageApi.open({
				type: 'error',
				content: 'Ошибка при обновлении'
			});
		} finally {
			setEditingId(null);
			setEditText('');
		}
	};

	const sortHandler = (field: 'name' | 'email' | 'completed') => {
		setSortBy(field);
	};

	const toggleHandler = (id: number, completed: boolean) => {
		try {
			toggleTodo({ id, completed: !completed });
			messageApi.open({
				type: 'success',
				content: 'Задача обновлена'
			});
		} catch {
			messageApi.open({
				type: 'error',
				content: 'Ошибка при обновлении'
			});
		}
	};

	const changeTableHandler = (sorter: any, action: 'sort' | 'filter' | 'paginate') => {
		if (action === 'sort' && sorter.field && ['name', 'email', 'completed'].includes(sorter.field)) {
			setSortBy(sorter.field);
			if (sorter.order) toggleOrder();
		}
	};

	const editHandler = (id: number, title: string) => {
		setEditingId(id);
		setEditText(title);
	};

	const columns = [
		{
			title: 'Имя',
			dataIndex: 'name',
			sorter: true,
			onHeaderCell: () => ({
				onClick: () => sortHandler('name')
			})
		},
		{
			title: 'Email',
			dataIndex: 'email',
			sorter: true,
			onHeaderCell: () => ({
				onClick: () => sortHandler('email')
			})
		},
		{
			title: 'Задача',
			width: 350,
			maxWidth: 350,
			ellipsis: true,
			render: (todo: Todo) =>
				editingId === todo.id ? (
					<Input
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						onPressEnter={saveEdit}
						onBlur={saveEdit}
					/>
				) : (
					<span>
						{todo.title}{' '}
						{todo.edited ? (
							<Text type='secondary' italic>
								(отр. адм.)
							</Text>
						) : (
							''
						)}
						{isAdmin ? (
							<Button type='link' size='small' onClick={() => editHandler(todo.id, todo.title)}>
								✏️
							</Button>
						) : (
							<></>
						)}
					</span>
				)
		},
		{
			title: 'Статус',
			dataIndex: 'completed',
			sorter: true,
			render: (val: boolean, todo: Todo) =>
				isAdmin ? (
					<Checkbox checked={val} onChange={() => toggleHandler(todo.id, todo.completed)} />
				) : val ? (
					'✅'
				) : (
					'В работе'
				),
			onHeaderCell: () => ({
				onClick: () => sortHandler('completed')
			})
		}
	];

	return (
		<>
			{contextHolder}
			<Table
				dataSource={data?.todos || []}
				columns={columns}
				loading={isLoading}
				pagination={{
					current: page,
					pageSize: limit,
					total: data?.total,
					onChange: (curPage) => setPage(curPage)
				}}
				rowKey='id'
				onChange={(pagination, filters, sorter: any, { action }) => changeTableHandler(sorter, action)}
			/>
		</>
	);
};
