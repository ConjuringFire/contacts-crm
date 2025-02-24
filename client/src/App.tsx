import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

const { Content } = Layout;

export default function App() {
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