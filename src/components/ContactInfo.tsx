import {Link} from "@tanstack/react-router";
import { useNavigate, useParams} from '@tanstack/react-router';

import { useContact, useDeleteContact } from '../hooks/useContacts.ts';
import Swal from 'sweetalert2';


function ContactInfo() {
    const  id  = useParams({
        strict: false,
        select: (params) => params.id});


    const { data: contact, isLoading, error } = useContact(id); // Fetch contact data
    const deleteContactMutation = useDeleteContact(); // Hook to handle deletion
    const navigate = useNavigate()
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            deleteContactMutation.mutate(id, {
                onSuccess: () => {
                    Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
                    navigate({ to: '/' })
                },
                onError: () => {
                    Swal.fire('Error!', 'There was an error deleting the contact.', 'error');
                }
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching contacts</div>;
    }
    if (!contact) {
        return <div>Not Found</div>;
    }

    const { name, description, photo } = contact;

    return (
        <div className="w-1/2 flex-1 p-6">
            {/* Contact Profile Header */}
            <div className="flex items-center">
                <img
                    src={photo || "https://via.placeholder.com/100"}
                    alt="Contact"
                    className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                    <a
                        href="#"
                        className="text-blue-600 hover:underline text-sm font-medium"
                    >
                        {name.replace(" ", "")}
                    </a>
                    <p className="text-gray-600 mt-1 text-sm">{description}</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex space-x-4">
                <Link to={`/edit/$id`} params={{ id: id || ''}} className="[&.active]:font-bold">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Edit
                    </button>
                </Link>

                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ContactInfo;

