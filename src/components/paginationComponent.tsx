import React from 'react';

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    totalElements,
}) => {
    const handleClick = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="flex justify-between items-center px-4 py-3">
            <div className="text-sm text-slate-500">
                Showing{' '}
                <b>
                    {(currentPage - 1) * 9 + 1}-
                    {Math.min(currentPage * 9, totalElements)}
                </b>{' '}
                of {totalElements}
            </div>
            <div className="flex space-x-1">
                <button
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, pageIndex) => (
                    <button
                        key={pageIndex + 1}
                        onClick={() => handleClick(pageIndex + 1)}
                        className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${
                            currentPage === pageIndex + 1
                                ? 'text-white bg-slate-800 border-slate-800'
                                : 'text-slate-500 bg-white border-slate-200'
                        } rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease`}
                    >
                        {pageIndex + 1}
                    </button>
                ))}
                <button
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
