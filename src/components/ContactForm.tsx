import React, { useState, useEffect } from 'react';
import { contactSchema } from '../schemas/contactSchema'; // Import the Zod schema
import { z } from 'zod';
import {useCreateContact, useUpdateContact,  useContact} from "../hooks/useContacts.ts";

import { useParams} from '@tanstack/react-router';

// Type for form fields
interface ContactFormFields {
    name: string;
    username: string;
    photo: string;
    description?: string; // Optional description
}

const NewContactForm: React.FC = () => {
    const  id  = useParams({strict: false, select: (params) => params.id,});
    const isEdit = !!id
    const { data: contact } = useContact(id);

    const [formData, setFormData] = useState<ContactFormFields>({
        name: '',
        username: '',
        photo: '',
        description: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({}); // To store validation errors
    // Mutation for creating a new contact
    const createMutation = useCreateContact()
    const updateMutation = useUpdateContact()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({}); // Reset errors

        // Validate the form data using Zod
        try {
            debugger
            contactSchema.parse(formData); // Validate the data

            // If validation passes, call the mutation
            if (isEdit && contact) {
                // If editing, call the update mutation
                await updateMutation.mutate(formData, contact.id); // Pass the contact ID from initialContact
            } else {
                // If creating, call the create mutation
                createMutation.mutate(formData);
                setFormData({ name: '', username: '', photo: '', description: '' }); // Reset the form
            }
        } catch (err) {

            if (err instanceof z.ZodError) {
                // Process validation errors
                const validationErrors = err.flatten().fieldErrors;
                const convertedErrors: Record<string, string> = {};

                // Loop through validationErrors and flatten them down to a single string
                for (const key in validationErrors) {
                    if (Array.isArray(validationErrors[key])) {
                        convertedErrors[key] = validationErrors[key].join(', ');
                    }
                }

                setErrors(convertedErrors);
            }
        }
    };


    useEffect(() => {
        if (isEdit && contact) {
            setFormData(contact);
        }
    }, [contact, isEdit]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
            <div className={"ml-10"}>
                <label className=" ali text-neutral-500 block text-sm">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-200 text-gray-800 border rounded  m-2 p-2 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div className={"ml-10"}>
                <label className=" text-neutral-500 block text-sm">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-200 text-gray-800 border rounded m-2 p-2 ${errors.username ? 'border-red-500' : ''}`}
                />
                {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>
            <div className={"ml-10"}>
                <label className="text-neutral-500 block text-sm">Photo URL</label>
                <input
                    type="url"
                    name="photo"
                    value={formData.photo}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-200 text-gray-800 border rounded  m-2 p-2 ${errors.photo ? 'border-red-500' : ''}`}
                />
                {errors.photo && <p className="text-red-500 text-xs">{errors.photo}</p>}
            </div>
            <div className={"ml-10"}>
                <label className=" text-neutral-500 block text-sm">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-200 text-gray-800 border rounded m-2 p-2 ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.photo && <p className="text-red-500 text-xs">{errors.photo}</p>}
            </div>
            <button type="submit" className="bg-blue-600 text-white rounded p-2">{isEdit? 'Save Contact': 'Add Contact'}</button>
            {createMutation.isError && <p>Error adding contact.</p>}
        </form>
    );
};

export default NewContactForm;
