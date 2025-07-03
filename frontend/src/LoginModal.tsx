import { Form, Input, Button, message, Modal } from 'antd';
// import { useAppDispatch } from './hooks';
import { type AppDispatch } from './redux';
import { loginAsAdmin } from './redux/auth/auth.slice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export const LoginModal = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const [messageApi, contextHolder] = message.useMessage();

	const cancelHandler = () => {
		setIsOpen(false);
	};

	const loginHandler = (values: { login: string; password: string }) => {
		const { login, password } = values;

		if (login === 'admin' && password === '123') {
			dispatch(loginAsAdmin());
			messageApi.open({
				type: 'success',
				content: 'Вы вошли как администратор'
			});
			setIsOpen(false);
		} else {
			messageApi.open({
				type: 'error',
				content: 'Неверные данные'
			});
		}
	};

	return (
		<>
			{contextHolder}
			<Button type='primary' onClick={() => setIsOpen(true)}>
				Войти как администратор
			</Button>
			<Modal title='Вход' open={isOpen} onCancel={cancelHandler} footer={null} destroyOnHidden>
				<Form onFinish={loginHandler} layout='inline'>
					<Form.Item name='login' rules={[{ required: true }]}>
						<Input placeholder='Логин' />
					</Form.Item>
					<Form.Item name='password' rules={[{ required: true }]}>
						<Input.Password placeholder='Пароль' />
					</Form.Item>
					<Form.Item>
						<Button htmlType='submit' type='primary'>
							Войти
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
