import React, { ReactElement, RefObject, useMemo, useCallback } from 'react';
import styles from "./CommentArea.module.scss";
// import JsxParser from 'react-jsx-parser';
// import FireText from '../../animatedText/FireText/FireText';
// import ThunderText from '../../animatedText/ThunderText/ThunderText';
// import IceText from '../../animatedText/IceText/IceText';
// import EarthText from '../../animatedText/EarthText/EarthText';
// import RegexText from '../../animatedText/RegexText/RegexText';
// import MetalHeadText from '../../animatedText/MetalHeadText/MetalHeadText';
import { addMarkdownToSelection, comment, styleText } from '../../../helpers/articlePageHelpers';
import { PostIdType, UserIdType } from '../../../types';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { createEditor, Text, Editor } from 'slate'
import Prism from 'prismjs';
import { 
  FormatListBulleted,
  FormatListNumbered,
  FormatBold,
  FormatItalic,
  FormatQuote
} from '@material-ui/icons';

// eslint-disable-next-line
;Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

interface CommentAreaProps {
  commentRef: RefObject<any>;
  comments: Array<any>;
  setComments: Function;
  postId: PostIdType;
  userId: UserIdType;
  commenting: boolean;
  setCommenting: Function;
  viewComment: boolean;
  setViewComment: Function;
  setCommentContent: Function;
  commentContent: string;
  noAnim: boolean;
}

export default function CommentArea({
  commentRef,
  comments,
  setComments,
  postId,
  userId,
  commenting,
  setCommenting,
  viewComment,
  setViewComment,
  setCommentContent,
  commentContent,
  noAnim }: CommentAreaProps): ReactElement {

  const editor: ReactEditor = useMemo(() => withReact(createEditor()), []);

// 
// 
// 

  const decorate = useCallback(([node, path]) => {
    const ranges = []

    if (!Text.isText(node)) {
      return ranges
    }

    const getLength = token => {
      if (typeof token === 'string') {
        return token.length
      } else if (typeof token.content === 'string') {
        return token.content.length
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0)
      }
    }

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown)
    let start = 0

    for (const token of tokens) {
      const length = getLength(token)
      const end = start + length

      if (typeof token !== 'string') {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        })
      }

      start = end
    }

    return ranges
  }, [])
  
  const addMarkdown = (editor: ReactEditor, markStart: string, markEnd: string) => {
    Editor.insertText(editor, `${markStart}${Editor.string(editor, editor.selection)}${markEnd}`)
  }

// 
// 
// 

  return (
    <>
      {
        commenting && 
          <p id={styles.commentLoading}>
            <img src={'/Ninja placeholder.png'} />
          </p> 
      }

      <Slate 
        editor={editor}
        value={[
          {
            type: 'paragraph',
            children: [
              {
                text: ''
              }
            ]
          }
        ]}
      >
        <Editable 
          decorate={decorate}
          id={styles.commentAreaView}
          className={noAnim && styles.noAnim}
          placeholder="Leave a Comment!"
          renderLeaf={({ attributes, leaf, children }) => {
            if (leaf.bold) {
              return <b {...attributes}>{children}</b>
            } else if (leaf.italic) {
              return <i {...attributes}>{children}</i>
            } else if (leaf.blockquote) {
              return <span className={styles.blockQuote} {...attributes}>{children}</span>
            } else if (leaf.list) {
              return <span className={styles.listItem} {...attributes}>{children}</span>
            } else {
              return <span {...attributes}>{children}</span>
            }
          }}
        />
      </Slate>

      <div id={styles.commentStylingBar} className={noAnim && styles.noAnim}>
        <button onClick={() => { addMarkdown(editor, '**', '**') }}>
          <FormatBold />
        </button>
        <button onClick={() => { addMarkdown(editor, '_', '_') }}>
          <FormatItalic />
        </button>
        <button onClick={() => { addMarkdown(editor, '>', '') }}>
          <FormatQuote />
        </button>
        <button onClick={() => { addMarkdown(editor, '- ', '') }}>
          <FormatListBulleted />
        </button>
        <button onClick={() => { addMarkdown(editor, '1. ', '') }}>
          <FormatListNumbered />
        </button>

        <button id={styles.postComment} onClick={() => {
          const commentArea: HTMLElement = document.getElementById(styles.commentAreaView)
          const content: string = commentArea.innerText;

          comment({ content: content, id: postId }, userId, comments, setCommenting, (newComments) => {
            setCommentContent('')
            setComments(newComments)
          })
        }}>
          <b>Comment</b>
        </button>
      </div>
    </>
  )
}