import React, { useEffect, useState } from 'react';
import { fetchBookById, updateBook } from '../store/bookSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useParams } from 'react-router-dom';

export const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const bookDetails = useAppSelector((state) =>
        state.books.books.find((book) => book._id === id)
    );
    const loading = useAppSelector((state) => state.books.loading);
    const error = useAppSelector((state) => state.books.error);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    interface Genre {
        name: string;
        _id: string;
    }

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationDate: '',
        genre: {} as Genre,
        summary: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchBookById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (bookDetails) {
            setBookData({
                title: bookDetails.title,
                author: bookDetails.author,
                isbn: bookDetails.isbn,
                publicationDate: bookDetails.publicationDate,
                genre: bookDetails.genre,
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

    const handleEditClick = () => {
        if (isEditing) {
            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            const formData = new FormData();
            Object.entries(bookData).forEach(([key, value]) => {
                if (typeof value === 'string') {
                    formData.append(key, value);
                }
            });
            if (id) {
                dispatch(updateBook({ bookId: id, bookData: formData }));
            }
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setBookData({ ...bookData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Book Details
            </h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="flex flex-col md:flex-row bg-gray-50 shadow-inner rounded-lg p-5 gap-6">
                    {/* Left side - Book Image */}
                    <div className="md:w-1/3 flex flex-col items-center mb-4 md:mb-0">
                        <img
                            src={
                                'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?size=626&ext=jpg'
                            }
                            alt="Book Cover"
                            className="w-full h-auto rounded-lg object-cover shadow-sm mb-4"
                        />
                        <label className="block">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none hidden">
                                Upload Image
                            </button>
                        </label>
                    </div>

                    {/* Right side - Book Details */}
                    <div className="md:w-2/3 flex flex-col justify-center">
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
                                            className="w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                {errors.title && (
                                    <span className="text-red-500">
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
                                            className="w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="text-gray-800 space-y-2">
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
                                                className="w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    {errors.author && (
                                        <span className="text-red-500">
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
                                                className="w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    {errors.isbn && (
                                        <span className="text-red-500">
                                            {errors.isbn}
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
                                                type="date"
                                                name="publicationDate"
                                                id="publicationDate"
                                                required
                                                value={bookData.publicationDate}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {errors.publicationDate && (
                                        <span className="text-red-500">
                                            {errors.publicationDate}
                                        </span>
                                    )}
                                    <div>
                                        <label
                                            htmlFor="genre"
                                            className="block text-sm font-medium text-gray-600"
                                        >
                                            Genre
                                        </label>
                                        <div className="mt-1 relative">
                                            <input
                                                type="text"
                                                name="genre"
                                                id="genre"
                                                readOnly
                                                value={bookData.genre._id}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    {errors.genre && (
                                        <span className="text-red-500">
                                            {errors.genre}
                                        </span>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    {bookData.title}
                                </h2>
                                <p className="text-gray-700 mb-6">
                                    {bookData.summary}
                                </p>
                                <div className="text-gray-800 space-y-2">
                                    <p>
                                        <span className="font-medium">
                                            Author:
                                        </span>{' '}
                                        {bookData.author}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            ISBN:
                                        </span>{' '}
                                        {bookData.isbn}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Published Date:
                                        </span>{' '}
                                        {bookData.publicationDate}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Genre:
                                        </span>{' '}
                                        {bookData.genre.name}
                                    </p>
                                </div>
                            </>
                        )}
                        <button
                            onClick={handleEditClick}
                            className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none"
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
