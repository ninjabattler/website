import { React, useState } from 'react';
import './stylesheets/CodeBlock.css';
import { CopyBlock, vs2015 } from "react-code-blocks";

export default function CodeBlock({ code, language, highlight }) {
  return (
    <code className='codeBlock'>
      <CopyBlock
        text={code}
        language={language}
        theme={vs2015}
        showLineNumbers
        highlight={highlight}
      />
    </code>)
}