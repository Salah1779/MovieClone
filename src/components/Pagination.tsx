import React from 'react';
import { Movie } from '../utils/types';
interface PaginationProps {
  currentPage: number;
  totalItems: Movie[];
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  setCurrentItems : (movies: Movie[]) => void,
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  setCurrentItems
}) => {
  
  const totalPages = Math.ceil(totalItems.length / itemsPerPage);
  
  
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems.length);
  
  
  const goToPage = (pageNumber: number) => {
    onPageChange(pageNumber);
    setCurrentItems(totalItems.slice(indexOfFirstItem, indexOfLastItem));
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);

    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };
  
  
  const renderPageButtons = () => {
    const pageButtons = [];
    
    
    pageButtons.push(
      <button 
        key="first"
        onClick={() => goToPage(1)}
        className={`w-10 h-10 rounded-md ${currentPage === 1 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
      >
        1
      </button>
    );
    
    
    if (totalPages > 5) {
      if (currentPage > 3) {
        pageButtons.push(
          <span key="ellipsis1" className="px-2">...</span>
        );
      }
      
    
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pageButtons.push(
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`w-10 h-10 rounded-md ${currentPage === i 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {i}
            </button>
          );
        }
      }
      
      if (currentPage < totalPages - 2) {
        pageButtons.push(
          <span key="ellipsis2" className="px-2">...</span>
        );
      }
    } else {
     
      for (let i = 2; i < totalPages; i++) {
        pageButtons.push(
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`w-10 h-10 rounded-md ${currentPage === i 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {i}
          </button>
        );
      }
    }
    
   
    if (totalPages > 1) {
      pageButtons.push(
        <button
          key="last"
          onClick={() => goToPage(totalPages)}
          className={`w-10 h-10 rounded-md ${currentPage === totalPages 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          {totalPages}
        </button>
      );
    }
    
    return pageButtons;
  };
  
  return (
    <>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 my-8">
          {/* Previous page button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Previous
          </button>
          
         
          <div className="flex items-center">
            {renderPageButtons()}
          </div>
          
        
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Next
          </button>
        </div>
      )}
      
    
      <div className="text-center text-gray-600 mb-4">
        Showing {indexOfFirstItem}-{indexOfLastItem} of {totalItems.length} items
      </div>
    </>
  );
};

export default Pagination;