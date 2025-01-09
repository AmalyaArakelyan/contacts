import {Link} from "@tanstack/react-router";
import {useContact, useContacts} from "../hooks/useContacts.ts";

import useDebounce from '../hooks/useDebounce';
import { useParams} from '@tanstack/react-router';
import { Contact } from '../types/contact.ts';
interface ContactListProps {
    searchTerm: string;
}
const ContactList = ({ searchTerm }:ContactListProps) => {

    const  id  = useParams({strict: false, select: (params) => params.id,});

    const { data: activeContact } = useContact(id);
    const { data: contacts, isLoading: isLoadingContacts, error: errorContacts } = useContacts();
    const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce input by 300ms

    if (isLoadingContacts) {
        return <div>Loading...</div>;
    }

    if (errorContacts) {
        return <div>Error fetching contacts</div>;
    }


    const filteredContacts =debouncedSearchTerm? contacts.filter((contact: Contact) =>
        contact.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ): contacts;
    console.log(contacts,activeContact, filteredContacts,  'contacts')
    const activeContactName = activeContact?.name
    return (<ul className="mt-2">
        {filteredContacts.map((contact: Contact) => {
            const {name, id} = contact
            return <li
                key={name}
                className={`p-0 cursor-pointer ${
                    activeContactName === name
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-200 text-gray-700"
                }`}
            >
                <Link   to="/$id" params={{ id }} className="[&.active]:font-bold block text-sm font-medium p-3">
                    {name}
                </Link>

            </li>
        })}
    </ul>)
}

export default ContactList
