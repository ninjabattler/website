import React, { ComponentType, useEffect, useState } from 'react';
import styles from './CodeBlock.module.scss';
import hljs from 'highlight.js'
// import { FileCopy, Check } from '@material-ui/icons';

type CodeBlockProps = {
  code: string;
  language: string;
  highlight?: string;
  title?: string;
}

const CodeBlock: ComponentType<CodeBlockProps> = ({ code, language, highlight, title }) => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div className={styles.codeBlock}>
      <h3>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true) }}
          onMouseLeave={() => { if (copied) { setCopied(false) } }}
        >
          {/* {copied ? <Check /> : <FileCopy />} */}
        </button>
        {title && title}
      </h3>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: hljs.highlight(code, { language: language }).value }}></code>
      </pre>
    </div>
  )
}


export default CodeBlock