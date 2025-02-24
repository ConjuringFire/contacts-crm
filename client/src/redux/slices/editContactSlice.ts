import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../types/contact';

const editContactSlice = createSlice({
    name: 'editContact',
    initialState: null as Contact | null,
    reducers: {
        setEditContact: (state, action: PayloadAction<Contact | null>) => action.payload,
    },
});

export const { setEditContact } = editContactSlice.actions;
export default editContactSlice.reducer;