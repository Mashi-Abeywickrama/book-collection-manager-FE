/// <reference types="react-scripts" />

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    totalElements: number;
}

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    genres: { _id: string; name: string }[];
}

interface ConfirmDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

interface Book {
    _id: string;
    title: string;
    author: string;
    genre: { _id: string; name: string };
    publicationDate: string;
    isbn: string;
    summary: string;
    coverImg: string;
}

interface BooksState {
    books: Book[];
    loading: boolean;
    error: string | null;
}

interface GenreState {
    genres: { _id: string; name: string }[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
