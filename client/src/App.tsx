import { useState } from 'react';
import ContactList from './components/ContactsList';
import useContacts from './hooks/useContacts';
import useContactActions from './hooks/useContactActions';
import { Layout, Typography } from 'antd';

const { Title } = Typography;

export default function App() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const { contacts, isLoading, error } = useContacts({searchTerm});
    const { handleCall} = useContactActions();

    const onCallClick = async (id: number) => {
        const result = await handleCall(id);
        alert(result.message);
    }

    return (
        <Layout>
            <Title>Contacts CRM</Title>
            <ContactList contacts={contacts} onCall={onCallClick} />
        </Layout>
    )
}