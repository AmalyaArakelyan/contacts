import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Contact} from '../schemas/contactSchema';
export const useContacts = () => {
    return useQuery({
        queryKey: ['contacts'], // Use queryKey option
        queryFn: async () => {
            const response = await axios.get('http://localhost:3001/contacts');
            return response.data;
        },
    });
};

export const useContact = (contactId: string | undefined) => {
    return useQuery({
        queryKey: ['contact', contactId], // Use queryKey option
        enabled:!!contactId,
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3001/contacts/${contactId}`);
            return response.data;
        },

    });
};

export const useCreateContact = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newContact: Contact) => {
            return axios.post('http://localhost:3001/contacts', newContact)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
        },
    })
};
export const useUpdateContact = () => {
    const queryClient = useQueryClient()
   return useMutation({
        mutationFn: (newContact: Contact) => {
            return axios.put(`http://localhost:3001/contacts/${newContact.id}`, newContact)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
        },
    })
};
export const useDeleteContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (contactId: string | undefined) => {
            return axios.delete(`http://localhost:3001/contacts/${contactId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
        },
    })
};

