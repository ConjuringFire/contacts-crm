// src/hooks/useContactActions.test.tsx
import { renderHook, act } from '@testing-library/react';
import useContactActions from './useContactActions';
import { Contact } from '../types/contact';

describe('useContactActions', () => {
    const mockContact: Contact = {
        id: 1,
        name: 'Test Contact',
        phone: '+1234567890',
        email: 'test@example.com',
    };

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    it('should call handleSave correctly', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        const { result } = renderHook(() => useContactActions());

        await act(async () => {
            await result.current.handleSave(mockContact);
        });

        expect(global.fetch).toHaveBeenCalledWith('/api/contacts/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mockContact),
        });
    });

    it('should call handleDelete correctly', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        const { result } = renderHook(() => useContactActions());

        await act(async () => {
            await result.current.handleDelete(1);
        });

        expect(global.fetch).toHaveBeenCalledWith('/api/contacts/1', { method: 'DELETE' });
    });

    it('should call handleCall correctly', async () => {
        const mockResponse = { message: 'Call initiated' };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });
        const { result } = renderHook(() => useContactActions());

        let response: { message: string } | undefined;
        await act(async () => {
            response = await result.current.handleCall(1);
        });

        expect(global.fetch).toHaveBeenCalledWith('/api/contacts/1/call', { method: 'POST' });
        expect(response).toEqual(mockResponse);
    });
});