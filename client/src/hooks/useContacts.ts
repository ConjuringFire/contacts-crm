import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchContactsFailure, fetchContactsStart, fetchContactsSuccess } from '../redux/slices/contactsSlice';

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
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                dispatch(fetchContactsSuccess(data));
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