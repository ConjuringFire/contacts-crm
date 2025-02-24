import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../types/contact';

interface ContactsState {
    contacts: Contact[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ContactsState = {
    contacts: [],
    isLoading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        fetchContactsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchContactsSuccess: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
            state.isLoading = false;
        },
        fetchContactsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchContactsStart, fetchContactsSuccess, fetchContactsFailure } = contactsSlice.actions;
export default contactsSlice.reducer;