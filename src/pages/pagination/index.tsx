import { useState } from 'react';
import Pagination from '../../components/components/Pagination';
import './pagination.css';
import CodeBox from '../../components/codeBox';

function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfContent = 178;
  const showContent = 10;
  const showButton = 7;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="min-h-[400px] flex justify-center bg-base-100 rounded-2xl">
        <Pagination
          numOfContent={numOfContent}
          showContent={showContent}
          showButton={showButton}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <CodeBox
        category="component"
        type="tsx"
        code={`
import React from 'react';

interface PaginationProps {
  numOfContent: number;
  showContent: number;
  showButton: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  numOfContent,
  showContent,
  showButton,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(numOfContent / showContent);

  const startPage = Math.ceil(currentPage / showButton) * showButton - showButton + 1; //첫페이지
  const endPage = Math.min(startPage + showButton - 1, totalPages); //

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button className="pagination-button prev" onClick={handlePreviousPage} disabled={currentPage === 1}>
        이전
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          className={\`pagination-button page \${currentPage === page ? 'active' : ''}\`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button className="pagination-button next" onClick={handleNextPage} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  );
};

export default Pagination;
`}
      />
      <CodeBox category="css" type="css" url="\src\pages\pagination\pagination.css" />
    </>
  );
}

export default PaginationPage;
