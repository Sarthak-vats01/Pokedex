import React from "react";

const Pagination = ({ currentPage, totalPages, onNext, onPrevious }) => {
  return (
    <div className="pagination-buttons flex justify-center items-center w-full mt-4 space-x-4">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Gradient text for current page number */}
      <span className="text-lg font-bold bg-gradient-to-r from-blue-500 via-blue-300 to-white bg-clip-text text-transparent">
        {currentPage} of {totalPages}
      </span>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
