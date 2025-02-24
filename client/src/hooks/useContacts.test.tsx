import { renderHook, waitFor } from '@testing-library/react';
import useContacts from './useContacts';
import { Contact } from '../types/contact';

describe('useContacts', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    it('should fetch contacts correctly', async () => {
        const mockContacts: Contact[] = [
            { id: 1, name: 'Test 1', phone: '+6134567890', email: 'test1@example.com' },
            { id: 2, name: 'Test 2', phone: '+6176543210', email: 'test2@example.com' },
        ];
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockContacts,
        });

        const { result } = renderHook(() => useContacts({}));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.contacts).toEqual(mockContacts);
        expect(result.current.error).toBeNull();
    });

    it('should handle errors correctly', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        const { result } = renderHook(() => useContacts({}));

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.isLoading).toBe(false);
        expect(result.current.contacts).toEqual([]);
        expect(result.current.error).toBe('HTTP error! status: 404');
    });

    it('should handle search term correctly', async () => {
        const mockContacts: Contact[] = [
            { id: 1, name: 'Test 1', phone: '+6134567890', email: 'test1@example.com' },
        ];
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockContacts,
        });

        const { result } = renderHook(() => useContacts({searchTerm: 'Test'}));

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(global.fetch).toHaveBeenCalledWith('/api/contacts/search?term=Test');
        expect(result.current.contacts).toEqual(mockContacts);
    });
});