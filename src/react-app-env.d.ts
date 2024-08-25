/// <reference types="react-scripts" />

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    totalElements: number;
  }
  