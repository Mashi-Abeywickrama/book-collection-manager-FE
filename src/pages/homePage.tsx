import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Pagination from '../components/paginationComponent';
export const HomePage = () => {
    const books = [
        {
            name: 'Harry Potter and the Sorcerer\'s Stone',
            author: 'J.K. Rowling',
            isbn: '978-0439708180',
            genre: 'Fantasy',
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Calculate total pages
    const totalPages = Math.ceil(books.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Book Data</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">Book Name</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">Author</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">ISBN</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">Genre</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.map((book, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-3 px-4">{book.name}</td>
                                <td className="py-3 px-4">{book.author}</td>
                                <td className="py-3 px-4">{book.isbn}</td>
                                <td className="py-3 px-4">{book.genre}</td>
                                <td className="py-3 px-4 flex items-center space-x-4">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button className="text-yellow-500 hover:text-yellow-700">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalElements = {books.length}
                />
            </div>
        </div>
    );
};
