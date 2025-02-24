import ContactForm from '../components/ContactForm';
import useContactActions from '../hooks/useContactActions';
import { useNavigate } from 'react-router-dom';
import { Layout, Space, Card, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setEditContact } from '../redux/slices/editContactSlice';
import { useState } from 'react';

const { Content } = Layout;

function CreateContact() {
    const { handleSave } = useContactActions();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const editContact = useSelector((state: RootState) => state.editContact)
    const [serverError, setServerError] = useState<string | null>(null);

    const navigatHome = () => {
        navigate('/');
    }

    const handleSaveClick = async (contact: any) => {
        try {
            await handleSave(contact);
            dispatch(setEditContact(null));
            navigatHome();
        } catch (e: any) {
            if (e.response && e.response.data && e.response.data.message) {
                setServerError(e.response.data.message);
            } else {
                setServerError("An error occurred while saving the contact.");
            }
        }
    };

    const handleCancel = () => {
        dispatch(setEditContact(null));
        navigatHome();
    }

    return (
        <Card title={editContact ? 'Edit Contact' : 'Create Contact'}>
            <Content style={{ padding: '24px 50px' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    {serverError && <Alert message={serverError} type="error" closable onClose={() => setServerError(null)} />} 
                    <ContactForm onSave={handleSaveClick} initialContact={editContact} onCancel={() => handleCancel()} />
                </Space>
            </Content>
        </Card>
    );
}

export default CreateContact;