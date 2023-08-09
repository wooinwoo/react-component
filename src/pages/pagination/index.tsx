import { useState } from 'react';
import Pagination from '../../components/components/Pagination';
import './pagination.css';
import CodeBox from '../../components/CodeBox';
import ParopsTable from '../../components/PropsTable';
import TestInput from '../../components/TestInput';

function PaginationPage() {
  const [numOfContent, setNumOfContent] = useState(178);
  const [showContent, setShowContent] = useState(10);
  const [showButton, setShowButton] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //props 설명
  const propsList = [
    { name: 'numOfContent', type: 'number', description: '전체 데이터 수' },
    { name: 'showContent', type: 'number', description: '한 페이지에 보여줄 데이터 수' },
    { name: 'showButton', type: 'number', description: '페이지네이션 버튼 수' },
    { name: 'currentPage', type: '(useState)-number', description: '현재 페이지 상태' },
    {
      name: 'setCurrentPage',
      type: '(useState)-React.Dispatch<React.SetStateAction<number>>',
      description: '현재 페이지 상태(set)',
    },
  ];

  return (
    <>
      {/* 컴포넌트 */}
      <div className="min-h-[300px] flex justify-center items-center items bg-base-100 rounded-2xl">
        <Pagination
          numOfContent={numOfContent}
          showContent={showContent}
          showButton={showButton}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* 테스트 그룹 */}
      <div className="w-[80%] m-auto flex justify-between my-10">
        <TestInput description={'전체 데이터 수'} state={numOfContent} setState={setNumOfContent} />
        <TestInput description={'한 페이지에 보여줄 데이터 수'} state={showContent} setState={setShowContent} />
        <TestInput description={'페이지네이션 버튼 수'} state={showButton} setState={setShowButton} />
      </div>

      {/* props 설명 */}
      <ParopsTable propsList={propsList} />

      {/* component 코드 뷰 */}
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

      {/* css 코드 뷰 */}
      <CodeBox category="css" type="css" url="\src\pages\pagination\pagination.css" />
    </>
  );
}

export default PaginationPage;
