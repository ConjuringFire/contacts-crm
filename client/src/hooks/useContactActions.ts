import axios from "axios";
import { Contact } from "../types/contact";

interface HandleCallResponse {
    result: string;
    message: string;  
}

export default function useContactActions() {
    const handleSave = async (contact:Contact):Promise<void> => {
        await axios({ 
            method: "POST",
            url: "/api/contacts",
            data: contact,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const handleEdit = async (id: number): Promise<Contact> => {
        const response = await axios.get(`/api/contacts/${id}`);
        return response.data;
    };

    const handleDelete = async (id: number):Promise<void> => {
        axios.delete(`/api/contacts/${id}`);
    };

    const handleCall = async (id: number): Promise<HandleCallResponse> => {
        const response = await axios.post(`/api/contacts/${id}/call`, { method: "POST" });
        return response.data;
    };

    return {handleSave, handleDelete, handleEdit, handleCall};
}