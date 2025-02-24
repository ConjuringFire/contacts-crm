import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateContact from './pages/CreateContact';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-contact" element={<CreateContact />} />
        </Routes>
    );
}

export default AppRoutes;