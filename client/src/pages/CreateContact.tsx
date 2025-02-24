import ContactForm from '../components/ContactForm';
import useContactActions from '../hooks/useContactActions';
import { useNavigate } from 'react-router-dom';
import { Layout, Space, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSearchTerm } from '../redux/slices/searchTermSlice';
import { setEditContact } from '../redux/slices/editContactSlice';

const { Content } = Layout;

function CreateContact() {
    const { handleSave } = useContactActions();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const editContact = useSelector((state: RootState) => state.editContact)

    const navigatHome = () => {
        navigate('/');
    }

    const handleSaveClick = async (contact: any) => {
        await handleSave(contact);
        dispatch(setEditContact(null)); // Clear edit contact
        navigatHome();
    };

    const handleCancel = () => {
        dispatch(setEditContact(null));
        navigatHome();
    }

    return (
        <Card title={editContact ? 'Edit Contact' : 'Create Contact'}>
            <Content style={{ padding: '24px 50px' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <ContactForm onSave={handleSaveClick} initialContact={editContact} onCancel={() => handleCancel()} />
                </Space>
            </Content>
        </Card>
    );
}

export default CreateContact;