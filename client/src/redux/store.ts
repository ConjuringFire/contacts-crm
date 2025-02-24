import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';
import editContactReducer from './slices/editContactSlice';
import searchTermReducer from './slices/searchTermSlice';

const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        editContact: editContactReducer,
        searchTerm: searchTermReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;