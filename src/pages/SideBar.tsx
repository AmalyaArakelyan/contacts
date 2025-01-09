import  { useState } from 'react';
import SearchBar from "../components/SearchBar.tsx";
import ContactList from "../components/ContactList.tsx";
export default function contacts() {
    const [searchTerm, setSearchTerm] = useState('');
    return (
            <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
                {/* Search Bar */}
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {/* Contact List */}
                <ContactList searchTerm={searchTerm} />
            </div>
    );
}


