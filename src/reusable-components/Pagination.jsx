import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">

      {/* Prev */}
      <button
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        Prev
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`px-3 py-1 border rounded ${
            currentPage === index
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() =>
          currentPage < totalPages - 1 && onPageChange(currentPage + 1)
        }
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;