import React, { ComponentType } from 'react';
import styles from './CodeBlock.module.scss';
import { CopyBlock, vs2015 } from "react-code-blocks";

type CodeBlockProps = {
  code: string;
  language: string;
  highlight?: string;
}

const CodeBlock: ComponentType<CodeBlockProps> = ({ code, language, highlight }) => (
  <code className={styles.codeBlock}>
    <CopyBlock
      text={code}
      language={language}
      theme={vs2015}
      showLineNumbers
      highlight={highlight}
    />
  </code>
)


export default CodeBlock