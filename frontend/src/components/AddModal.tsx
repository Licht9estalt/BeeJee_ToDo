import { Button, Modal, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useAddTodoMutation } from '../redux/todos/todos.api';

export const AddModal = () => {
	const [form] = Form.useForm();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [addTodo, { isLoading }] = useAddTodoMutation();
	const [messageApi, contextHolder] = message.useMessage();

	const cancelHandler = () => {
		setIsOpen(false);
	};

	const addHandler = () => {
		setIsOpen(true);
	};

	const sendHandler = async (values: { name: string; email: string; text: string }) => {
		try {
			await addTodo({
				title: values.text,
				name: values.name,
				email: values.email
			}).unwrap();

			messageApi.open({
				type: 'success',
				content: 'Задача добавлена'
			});

			form.resetFields();
			setIsOpen(false);
		} catch (err) {
			messageApi.open({
				type: 'error',
				content: 'Ошибка при добавлении задачи'
			});
		}
	};

	return (
		<>
			{contextHolder}
			<Button type='primary' onClick={addHandler}>
				Добавить задачу
			</Button>
			<Modal
				title='Новая задача'
				open={isOpen}
				onCancel={cancelHandler}
				confirmLoading={isLoading}
				footer={null}
				destroyOnHidden
			>
				<Form form={form} layout='vertical' onFinish={sendHandler}>
					<Form.Item label='Имя' name='name' rules={[{ required: true, message: 'Введите имя' }]}>
						<Input />
					</Form.Item>

					<Form.Item
						label='Email'
						name='email'
						rules={[
							{ required: true, message: 'Введите email' },
							{ type: 'email', message: 'Некорректный email' }
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item label='Текст задачи' name='text' rules={[{ required: true, message: 'Введите текст задачи' }]}>
						<Input.TextArea rows={3} />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' loading={isLoading} block>
							Добавить задачу
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
