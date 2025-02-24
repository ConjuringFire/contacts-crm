import { Layout } from 'antd';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './routes';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const { Content } = Layout;

export default function App() {
    const searchTerm = useSelector((state: RootState) => state.searchTerm);

    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ padding: '24px 50px' }}>
                    <AppRoutes />
                </Content>
            </Layout>
        </BrowserRouter>
    )
}