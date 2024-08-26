import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    fetchBooks,
    selectBooks,
    selectBooksLoading,
    deleteBookThunk,
} from '../store/bookSlice';
import { fetchGenresAsync, selectGenre } from '../store/genreSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../components/paginationComponent';
import { useAppDispatch } from '../store/hooks';
import ConfirmDelete from '../components/confirmDelete';
import AddBookModal from '../components/addBook';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const books = useSelector(selectBooks);
    const loading = useSelector(selectBooksLoading);
    const genres = useSelector(selectGenre);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [bookToDelete, setBookToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchBooks()).unwrap();
                await dispatch(fetchGenresAsync()).unwrap();
            } catch {
                toast.error('Failed to load data. Please try again.');
            }
        };

        fetchData();
    }, [dispatch]);

    const totalPages = Math.ceil(books.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDeleteClick = (bookId: string) => {
        setBookToDelete(bookId);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (bookToDelete) {
            try {
                await dispatch(deleteBookThunk(bookToDelete)).unwrap();
                setIsModalOpen(false);
                setBookToDelete(null);
                toast.success('Book deleted successfully.');
            } catch {
                toast.error('Failed to delete the book. Please try again.');
            }
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setBookToDelete(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Book Data</h2>
                <button
                    className="bg-gray-800 text-white py-2 px-6 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none transition duration-150 ease-in-out"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add New Book
                </button>
            </div>
            <div className="overflow-x-auto">
                {books.length === 0 ? (
                    <div className="text-center">No Books added</div>
                ) : (
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-4 px-6 font-medium text-gray-700 uppercase tracking-wider">Book Name</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-700 uppercase tracking-wider">Author</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-700 uppercase tracking-wider">ISBN</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-700 uppercase tracking-wider">Genre</th>
                                <th className="text-left py-4 px-6 font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBooks.map((book) => (
                                <tr key={book._id} className="hover:bg-gray-100 transition duration-200 border-b border-gray-200">
                                    <td className="py-4 px-6 text-gray-800">{book.title}</td>
                                    <td className="py-4 px-6 text-gray-600">{book.author}</td>
                                    <td className="py-4 px-6 text-gray-600">{book.isbn}</td>
                                    <td className="py-4 px-6 text-gray-600">{book.genre.name}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-4">
                                            <Link to={`/book/${book._id}`}>
                                                <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </Link>
                                            {/* <button className="text-yellow-500 hover:text-yellow-700 focus:outline-none">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button> */}
                                            <button
                                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                                onClick={() => handleDeleteClick(book._id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
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
                genres={genres}
            />

        </div>
    );
};
