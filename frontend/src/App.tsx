import { ConfigProvider, Layout, Typography } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

import { AddModal } from './components/AddModal';
import { LoginModal } from './components/LoginModal';
import { TodosTable } from './components/TodosTable';
import './App.css';

const { Title } = Typography;
const { Header, Content } = Layout;

export const App = () => (
	<>
		<ConfigProvider locale={ruRU}>
			<Layout>
				<Header className='header'>
					<Title>Список задач</Title>
					<div className='header-buttons'>
						<LoginModal />
						<AddModal />
					</div>
				</Header>
				<Content>
					<TodosTable />
				</Content>
			</Layout>
		</ConfigProvider>
	</>
);

export default App;
