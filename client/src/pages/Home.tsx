import { Alert, Button, Card, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ContactList from "../components/ContactsList";
import useContactActions from "../hooks/useContactActions";
import SearchBar from "../components/SearchBar";
import { setSearchTerm } from "../redux/slices/searchTermSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useContacts from "../hooks/useContacts";
import { setEditContact } from "../redux/slices/editContactSlice";

export default function Home() {
    const dispatch = useDispatch();

    const { contacts, isLoading, error } = useSelector((state: RootState) => state.contacts);
    const { handleDelete, handleEdit, handleCall } = useContactActions();
    const searchTerm = useSelector((state: RootState) => state.searchTerm);
    const navigate = useNavigate();

    useContacts({searchTerm});

    const handleEditClick = async (id: number) => {
        const contact = await handleEdit(id);
        dispatch(setEditContact(contact));
        navigate('/create-contact'); 
    };

    const handleCallClick = async (id: number) => {
        const result = await handleCall(id);
        alert(result.message);
    };

    const handleDeleteClick = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            await handleDelete(id);
            dispatch(setSearchTerm(""));
        }
    };

    const handleSearch = (term: string) => {
        dispatch(setSearchTerm(term));
    };


    const CreateContactButton = (
        <Link to="/create-contact">
            <Button type="primary" style={{ float: 'right' }}>Create Contact</Button>
        </Link>
    );

    return (
        <Card title="Contact Manager" extra={CreateContactButton}>
            <SearchBar onSearch={handleSearch} />
            {isLoading && <Spin size="large" />}
            {error && <Alert message={error} type="error" />}
            <ContactList contacts={contacts} onCall={handleCallClick} onDelete={handleDeleteClick} onEdit={handleEditClick} />
        </Card>
    );
}