const Pagination = ({ products, page, onClickPrevious, onClickNext }) => {
  const pageCount = Math.ceil(products.length / 12);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex">
      <button
        onClick={onClickPrevious}
        disabled={page === 1}
        className={`w-20 ${
          page === 1
            ? 'bg-gray-400 text-white font-semibold cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        } px-2 text-center rounded-sm transition duration-300 ease-in-out`}
      >
        Previous
      </button>

      <div className="flex">
        {pages.map((pageNumber) => (
          <div
            key={pageNumber}
            className={`mx-1 bg-orange-400 w-6 h-6 text-center text-white rounded-sm ${
              pageNumber === page ? 'font-bold underline' : ''
            }`}
          >
            {pageNumber}
          </div>
        ))}
      </div>

      <button
        onClick={onClickNext}
        disabled={page === pageCount}
        className={`w-20 ${
          page === pageCount
            ? 'bg-gray-400 text-white font-semibold cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        } px-2 text-center rounded-sm transition duration-300 ease-in-out`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
