import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchContactsFailure, fetchContactsStart, fetchContactsSuccess } from '../redux/slices/contactsSlice';
import axios from 'axios';

interface UseContactsProps {
    searchTerm?: string;
}

export default function useContacts(props: UseContactsProps) {
    const {searchTerm} = props;
    const dispatch = useDispatch();
    const { contacts, isLoading, error } = useSelector((state: RootState) => state.contacts);

    useEffect(() => {
        const fetchContacts = async () => {
            dispatch(fetchContactsStart());
            try {
                let url = '/api/contacts';
                if (searchTerm) {
                    url = `/api/contacts/search?term=${searchTerm}`;
                }
                const response = await axios.get(url);
                dispatch(fetchContactsSuccess(response.data));
            } catch (err) {
                if (err instanceof Error) {
                    dispatch(fetchContactsFailure(err.message));
                } else {
                    dispatch(fetchContactsFailure("An unknown error occurred."));
                }
            }
        };
        fetchContacts();
    }, [searchTerm, dispatch]);

    return { contacts, isLoading, error };
};