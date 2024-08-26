import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addBook, fetchBooks } from '../store/bookSlice';
import { useAppDispatch } from '../store/hooks';
import { fetchGenresAsync, selectGenre } from '../store/genreSlice';
import axiosInstance from '../service/api/axiosInstance';

const AddBookModal: React.FC<AddBookModalProps> = ({
    isOpen,
    onClose,
}) => {
    const dispatch = useAppDispatch();
    const genres = useSelector(selectGenre); // Fetching genres from Redux store
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [isbn, setIsbn] = useState('');
    const [summary, setSummary] = useState('');
    const [newGenre, setNewGenre] = useState('');
    const [isAddingNewGenre, setIsAddingNewGenre] = useState(false);

    const handleAddGenre = async () => {
        try {
            const response = await axiosInstance.post('/genre', {
                name: newGenre,
            });
            const addedGenre = response.data;

            dispatch(fetchGenresAsync()); // Re-fetch genres to update the state
            setGenre(addedGenre._id); // Set the newly added genre
            setNewGenre('');
            setIsAddingNewGenre(false);
        } catch (error) {
            console.error('Failed to add new genre:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('genre', genre);
        formData.append('publicationDate', publicationDate);
        formData.append('isbn', isbn);
        formData.append('summary', summary);
        try{
            dispatch(addBook(formData)); // Dispatch action to add a new book
            dispatch(fetchBooks());// Fetch books to update the list
            onClose();
        }
        catch(error){
            console.error('Failed to add new book:', error);
        }
        dispatch(addBook(formData)); // Dispatch action to add a new book
        dispatch(fetchBooks());// Fetch books to update the list
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Author Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Author
                        </label>
                        <input
                            type="text"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>

                    {/* Genre Selection or Addition */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Genre
                        </label>
                        {!isAddingNewGenre ? (
                            <div>
                                <select
                                    className="mt-1 p-2 w-full border rounded-md"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    required
                                >
                                    <option value="">Select a genre</option>
                                    {genres.map((genre) => (
                                        <option
                                            key={genre._id}
                                            value={genre._id}
                                        >
                                            {genre.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="text-blue-500 mt-2"
                                    onClick={() => setIsAddingNewGenre(true)}
                                >
                                    Add New Genre
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    value={newGenre}
                                    onChange={(e) =>
                                        setNewGenre(e.target.value)
                                    }
                                    placeholder="Enter new genre"
                                    required
                                />
                                <button
                                    type="button"
                                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                                    onClick={handleAddGenre}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="ml-2 text-gray-500"
                                    onClick={() => setIsAddingNewGenre(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Publication Date Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Publication Date
                        </label>
                        <input
                            type="date"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={publicationDate}
                            onChange={(e) => setPublicationDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* ISBN Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            ISBN
                        </label>
                        <input
                            type="text"
                            className="mt-1 p-2 w-full border rounded-md"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            required
                        />
                    </div>

                    {/* Summary Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Summary
                        </label>
                        <textarea
                            className="mt-1 p-2 w-full border rounded-md"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        >
                            Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;