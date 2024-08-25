import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    fetchBooks,
    selectBooks,
    selectBooksLoading,
    selectBooksError,
    deleteBookThunk,
} from '../store/bookSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/paginationComponent';
import { useAppDispatch } from '../store/hooks';
import ConfirmDelete from '../components/confirmDelete';
import AddBookModal from '../components/addBook';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const books = useSelector(selectBooks);
    const loading = useSelector(selectBooksLoading);
    const error = useSelector(selectBooksError);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const [bookToDelete, setBookToDelete] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    // Calculate total pages
    const totalPages = Math.ceil(books.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDeleteClick = (bookId: string) => {
        setBookToDelete(bookId);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (bookToDelete) {
            dispatch(deleteBookThunk(bookToDelete));
            setIsModalOpen(false);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setBookToDelete(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Book Data</h2>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => setIsAddModalOpen(true)}
            >
                Add New Book
            </button>
            <div className="overflow-x-auto">
                {books.length === 0 ? (
                    <div className="text-center">No Books added</div>
                ) : (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Book Name
                                </th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">
                                    ISBN
                                </th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Genre
                                </th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBooks.map((book) => (
                                <tr key={book._id} className="border-b">
                                    <td className="py-3 px-4">{book.title}</td>
                                    <td className="py-3 px-4">{book.author}</td>
                                    <td className="py-3 px-4">{book.isbn}</td>
                                    <td className="py-3 px-4">
                                        {book.genre.name}
                                    </td>
                                    <td className="py-3 px-4 flex items-center space-x-4">
                                        <Link to={`/book/${book._id}`}>
                                            <button className="text-blue-500 hover:text-blue-700">
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </Link>
                                        <button className="text-yellow-500 hover:text-yellow-700">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() =>
                                                handleDeleteClick(book._id)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalElements={books.length}
                />
            </div>
            <ConfirmDelete
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
            <AddBookModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                genres={[
                    { _id: '66c89c9b5ea66fe83c2465c1', name: 'Fantacy' },
                    { _id: '66c89c9b5ea66fe83c2465c3', name: 'Romance' },
                ]}
            />
        </div>
    );
};
