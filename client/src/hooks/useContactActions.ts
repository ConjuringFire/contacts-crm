import { Contact } from "../types/contact";

interface HandleCallResponse {
    result: string;
    message: string;  
}

export default function useContactActions() {
    const handleSave = async (contact:Contact):Promise<void> => {
        const {id} = contact;

        const method = "POST";
        const url = "/api/contacts";

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });
    }

    const handleEdit = async (id: number): Promise<Contact> => {
        const response = await fetch(`/api/contacts/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    };

    const handleDelete = async (id: number):Promise<void> => {
        await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    };

    const handleCall = async (id: number): Promise<HandleCallResponse> => {
        const response = await fetch(`/api/contacts/${id}/call`, { method: "POST" });
        return response.json();
    };

    return {handleSave, handleDelete, handleEdit, handleCall};
}