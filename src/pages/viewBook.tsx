import React, { useEffect, useState } from 'react';
import { fetchBookById, updateBook } from '../store/bookSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGenresAsync, selectGenre } from '../store/genreSlice';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const BookDetails: React.FC = () => {
const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const bookDetails = useAppSelector((state) =>
        state.books.books.find((book) => book._id === id)
    );
    const genres = useAppSelector(selectGenre); // Fetch genres from Redux store
    const loading = useAppSelector((state) => state.books.loading);
    const error = useAppSelector((state) => state.books.error);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };
    
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationDate: '',
        genre: '',
        summary: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchBookById(id));
        }
        dispatch(fetchGenresAsync()); // Fetch genres when component mounts
    }, [id, dispatch]);

    useEffect(() => {
        if (bookDetails) {
            setBookData({
                title: bookDetails.title,
                author: bookDetails.author,
                isbn: bookDetails.isbn,
                publicationDate: bookDetails.publicationDate,
                genre: bookDetails.genre._id, // Set genre ID
                summary: bookDetails.summary,
            });
        }
    }, [bookDetails]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!bookData.title) newErrors.title = 'Title is required';
        if (!bookData.author) newErrors.author = 'Author is required';
        if (!bookData.isbn) newErrors.isbn = 'ISBN is required';
        if (!bookData.publicationDate)
            newErrors.publicationDate = 'Published Date is required';
        if (!bookData.genre) newErrors.genre = 'Genre is required';
        return newErrors;
    };

    const handleEditClick = async () => {
        if (isEditing) {
            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            const formData = new FormData();
            Object.entries(bookData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            if (id) {
                const resultAction = await dispatch(updateBook({ bookId: id, bookData: formData }));
                if (updateBook.fulfilled.match(resultAction)) {
                toast.success('Book updated successfully.');

                    // Update bookData with the updated book details
                    setBookData(resultAction.payload);
                    setIsEditing(false);
                }
            }
        } else {
            setIsEditing(true);
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setBookData({ ...bookData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };
    return (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={handleBackClick}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back
                </button>
                <h1 className="text-3xl font-semibold text-gray-900 text-center flex-1">
                    Book Details
                </h1>
            </div>
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <div className="flex flex-col md:flex-row bg-gray-50 shadow-inner rounded-lg p-6 gap-8">
                    {/* Left side - Book Image */}
                    <div className="md:w-1/3 flex flex-col items-center">
                        <img
                            src={
                                'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?size=626&ext=jpg'
                            }
                            alt="Book Cover"
                            className="w-full h-full rounded-lg object-cover shadow-sm mb-4"
                        />
                    </div>

                    {/* Right side - Book Details */}
                    <div className="md:w-2/3 flex flex-col justify-center space-y-6">
                        {isEditing ? (
                            <>
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Book Name
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            required
                                            value={bookData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                {errors.title && (
                                    <span className="text-red-500 text-sm">
                                        {errors.title}
                                    </span>
                                )}
                                <div>
                                    <label
                                        htmlFor="summary"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Description
                                    </label>
                                    <div className="mt-1 relative">
                                        <textarea
                                            name="summary"
                                            id="summary"
                                            required
                                            value={bookData.summary}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="author"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Author
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type="text"
                                            name="author"
                                            id="author"
                                            required
                                            value={bookData.author}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                {errors.author && (
                                    <span className="text-red-500 text-sm">
                                        {errors.author}
                                    </span>
                                )}
                                <div>
                                    <label
                                        htmlFor="isbn"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        ISBN Number
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type="text"
                                            name="isbn"
                                            id="isbn"
                                            required
                                            value={bookData.isbn}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                {errors.isbn && (
                                    <span className="text-red-500 text-sm">
                                        {errors.isbn}
                                    </span>
                                )}
                                <div>
                                    <label
                                        htmlFor="publicationDate"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Published Date
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type="date"
                                            name="publicationDate"
                                            id="publicationDate"
                                            required
                                            value={bookData.publicationDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                {errors.publicationDate && (
                                    <span className="text-red-500 text-sm">
                                        {errors.publicationDate}
                                    </span>
                                )}
                                <div>
                                    <label htmlFor="genre" className="block text-sm font-medium text-gray-600">
                                        Genre
                                    </label>
                                    <div className="mt-1 relative">
                                        <select
                                            name="genre"
                                            id="genre"
                                            value={bookData.genre}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select a genre</option>
                                            {genres.map((genre) => (
                                                <option key={genre._id} value={genre._id}>
                                                    {genre.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {errors.genre && <span className="text-red-500 text-sm">{errors.genre}</span>}
                                {errors.genre && (
                                    <span className="text-red-500 text-sm">
                                        {errors.genre}
                                    </span>
                                )}
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    {bookData.title}
                                </h2>
                                <p className="text-gray-700 mb-6">
                                    {bookData.summary}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">
                                        Author:
                                    </span>{' '}
                                    {bookData.author}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">ISBN:</span>{' '}
                                    {bookData.isbn}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">
                                        Published Date:
                                    </span>{' '}
                                    {new Date(
                                        bookData.publicationDate
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Genre:</span>{' '}
                                    {genres.find(
                                        (genre) => genre._id === bookData.genre
                                    )?.name}
                                </p>
                            </>
                        )}

                        <button
                            onClick={handleEditClick}
                            className="mt-8 w-full md:w-1/2 self-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none transition-colors duration-200"
                        >
                            {isEditing ? 'Save Changes' : 'Edit'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};