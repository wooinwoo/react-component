import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBox = ({ category, url, type, code }: { category: string; url?: string; type: string; code?: string }) => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    if (type === 'css') {
      fetchFileContent();
    } else {
      setFileContent(code);
    }
  }, []);

  function extractCSS(bundleCode: string) {
    const regex = /(?<=const __vite__css = ")([\s\S]*?)(?=")/;
    const match = bundleCode.match(regex);
    const formattedCss = match ? match[0].replace(/\\r\\n/g, '\n') : '파일 부르기 실패입니다요';
    return formattedCss;
  }

  const fetchFileContent = async () => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      console.log(text);
      const cssContent = extractCSS(text);
      setFileContent(cssContent);

      console.log(cssContent);
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  return (
    <div className="my-10">
      <h4 className="w-[80%] max-h-[400px] m-auto">{category}</h4>
      <div className="display-pagination-css w-[80%] max-h-[500px] rounded-2xl m-auto  overflow-auto">
        <SyntaxHighlighter language={type} style={dark}>
          {fileContent}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
export default CodeBox;
