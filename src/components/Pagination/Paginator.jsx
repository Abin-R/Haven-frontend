import  { useState } from "react";

function Paginator() {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    setCurrentPage(page);
    // Add logic to fetch data for the selected page
    // For example, you might want to call an API to get paginated data
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    // Assuming you have a total number of pages (totalPages)
    const totalPages = 3; // You should replace this with the actual total number of pages
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex justify-center mt-12 py-3">
          <li>
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#"
              aria-label="Previous"
              onClick={handlePrevious}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {/* Render pagination links based on your total number of pages */}
          {[1, 2, 3].map((page) => (
            <li key={page} className={currentPage === page ? "font-bold" : ""}>
              <a
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#"
                onClick={() => goToPage(page)}
              >
                {page}
              </a>
            </li>
          ))}
          <li>
            <a
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:hover:bg-neutral-700 dark:hover:text-white"
              href="#"
              aria-label="Next"
              onClick={handleNext}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Paginator;
