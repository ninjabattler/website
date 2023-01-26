import React, { ComponentType, useEffect, useState } from 'react';
import styles from './CodeBlock.module.scss';
// import SyntaxHighlighter from 'react-syntax-highlighter';
import hljs from 'highlight.js'
import { FileCopy, Check } from '@material-ui/icons';
import vscDarkPlus from './vscDarkPlus.json';

type CodeBlockProps = {
  code: string;
  language: string;
  highlight?: string;
  title?: string;
}

const getHighlightLines = (highlights: string): number[] => {
  const highlightLines = [];
  const highlightRanges: string[] = highlights.split(',');

  highlightRanges.forEach((range: string) => {
    const splitRange: string[] = range.split('-');
    const start: number = Number(splitRange[0]);
    const end: number = Number(splitRange[1]);

    for (let i = start; i <= end; i++) {
      highlightLines.push(i);
    }
  })

  return highlightLines;
}

const CodeBlock: ComponentType<CodeBlockProps> = ({ code, language, highlight, title }) => {
  const [highlightLines, setHighlightLines] = useState<number[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (highlight) {
      setHighlightLines(getHighlightLines(highlight));
    }
  }, [])

  return (
    <div className={styles.codeBlock}>
      <h3>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true) }}
          onMouseLeave={() => { if (copied) { setCopied(false) } }}
        >
          {copied ? <Check /> : <FileCopy />}
        </button>
        {title && title}
      </h3>

      {/* <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        wrapLines
        wrapLongLines
        lineProps={(lineNumber: number) => {
          if (!highlightLines.includes(lineNumber) && highlight) {
            return {style: { opacity: 0.5, filter: 'blur(0.04vw) grayscale(0.5)'}}
          } else {
            return {}
          }
        }}
      >
        {code}
      </SyntaxHighlighter> */}
      <pre>
        <code dangerouslySetInnerHTML={{ __html: hljs.highlight(code, { language: language }).value }}></code>
      </pre>
    </div>
  )
}


export default CodeBlock