import React from 'react';
import { Link } from '@tanstack/react-router';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void; // Function to set the search term
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="p-4 border-b border-gray-200 mt-4 flex space-x-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
                placeholder="Search"
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            <Link to="/create" className="[&.active]:font-bold">
                <button className="px-4 py-2 bg-green-600 text-white focus:outline-none rounded-lg hover:bg-green-700 focus:ring-green-500">
                    New
                </button>
            </Link>
        </div>
    );
};

export default SearchBar;
