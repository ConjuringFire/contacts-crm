import { useState, useEffect } from 'react';
import { Contact } from '../types/contact';

interface UseContactsProps {
    searchTerm?: string;
}

export default function useContacts(props: UseContactsProps) {
    const {searchTerm} = props;

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchContacts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const url = searchTerm ? `/api/contacts/search?term=${searchTerm}` : `/api/contacts`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setContacts(data);
            } catch(e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchContacts();
    }, [searchTerm]);

    return {contacts, isLoading, error};
};