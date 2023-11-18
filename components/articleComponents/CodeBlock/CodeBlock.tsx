import React, { FC, useState, useCallback, useEffect, useRef } from 'react';
import styles from './CodeBlock.module.scss';
import hljs from 'highlight.js'
import { RiFile2Fill, RiCheckboxFill } from 'react-icons/ri';

type CodeBlockProps = {
  code: string;
  language: string;
  title?: string;
}

/**
 * Component used to display a block of code, with a set language and an optional title
 * @param code The main content of the Code Block
 * @param language The language of the code
 * @param title An optional title to display on the Code Block
 * @author ninjabattler
 */
const CodeBlock: FC<CodeBlockProps> = ({ code, language, title='' }) => {
  const [isCopiedToClipboard, setIsCopiedToClipboard] = useState<boolean>(false);
  const codeRef = useRef<HTMLDivElement>();

  const copyCodeToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code);
    setIsCopiedToClipboard(true);
  }, [isCopiedToClipboard]);

  const unsetIsCopiedToClipboard = useCallback(() => {
    if (isCopiedToClipboard) {
      setIsCopiedToClipboard(false);
    };
  }, [isCopiedToClipboard]);

  useEffect(() => {
    if (codeRef.current) {
      const highlightedCode = hljs.highlight(code, { language: language }).value;

      codeRef.current.innerHTML = highlightedCode;
    };
  }, [codeRef]);

  return (
    <section className={styles.codeBlock}>
      <header>
        <button
          onClick={copyCodeToClipboard}
          onMouseLeave={unsetIsCopiedToClipboard}
          title='Copy'
        >
          {isCopiedToClipboard
            ? <RiCheckboxFill />
            : <RiFile2Fill />
          }
        </button>
        
        <span>{title}</span>
      </header>

      <pre>
        <code ref={codeRef}/>
      </pre>
    </section>
  );
};

export default CodeBlock;