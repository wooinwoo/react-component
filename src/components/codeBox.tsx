import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BiSolidCopy } from 'react-icons/bi';

const CodeBox = ({ category, url, type, code }: { category: string; url?: string; type: string; code?: string }) => {
  const [fileContent, setFileContent] = useState('');

  //! css 파일을 url로 불러오기
  const fetchFileContent = async () => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const text = await response.text();
      const cssContent = extractCSS(text);
      setFileContent(cssContent);
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };
  //! 불러온 css 파일을 형식에 맞게 변환
  function extractCSS(bundleCode: string) {
    const regex = /(?<=const __vite__css = ")([\s\S]*?)(?=")/;
    const match = bundleCode.match(regex);
    const formattedCss = match ? match[0].replace(/\\r\\n/g, '\n') : '파일 부르기 실패입니다요';
    return formattedCss;
  }

  //! 복사하기
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      alert('복사 되었습니다.');
    } catch (error) {
      alert('복사 실패' + error);
    }
  };

  //
  useEffect(() => {
    if (type === 'css') {
      fetchFileContent();
    } else {
      setFileContent(code ?? '');
    }
  }, []);
  return (
    <div className="my-10">
      <h4 className="relative w-[80%] max-h-[400px] m-auto z-10 text-white">
        {category}{' '}
        <BiSolidCopy
          className="absolute top-12 right-10 w-[20px] h-[20px] cursor-pointer"
          onClick={() => {
            handleCopyClipBoard(fileContent);
          }}
        />
      </h4>
      <div className="relative display-pagination-css w-[80%] max-h-[500px] rounded-2xl m-auto  overflow-auto">
        <SyntaxHighlighter language={type} style={dark}>
          {fileContent}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
export default CodeBox;
