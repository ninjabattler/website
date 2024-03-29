import React, {
  FC,
  useMemo,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "./CommentArea.module.scss";
import {
  getTokenLength,
  sendComment,
} from "../../../helpers/articlePageHelpers";
import { PostIdType, UserIdType } from "../../../types";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { createEditor, Text, Editor } from "slate";
import Prism from "prismjs";
import { SvgIcon } from "@mui/material";
import {
  COMMENT_STYLING_OPTIONS,
  DEFAULT_SLATE_VALUE,
} from "../../../constants/constants";

// Adds markdown as a language to Prism
// eslint-disable-next-line
Prism.languages.markdown = Prism.languages.extend("markup", {}), Prism.languages.insertBefore("markdown", "prolog", { blockquote: { pattern: /^>(.*)$/gm, alias: "punctuation" }, code: [{ pattern: /^(?: {4}|\t).+/m, alias: "keyword" }, { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" }], title: [{ pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/, alias: "important", inside: { punctuation: /==+$|--+$/ } }, { pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: "important", inside: { punctuation: /^#+|#+$/ } }], hr: { pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: "punctuation" }, list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: "punctuation" }, "url-reference": { pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/, inside: { variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 }, string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/, punctuation: /^[\[\]!:]|[<>]/ }, alias: "url" }, bold: { pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/, lookbehind: !0, inside: { punctuation: /^\*\*|^__|\*\*$|__$/ } }, italic: { pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/, lookbehind: !0, inside: { punctuation: /^[*_]|[*_]$/ } }, url: { pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/, inside: { variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 }, string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ } } } }), Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic), Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

interface CommentAreaProps {
  comments: Array<any>;
  setComments: Dispatch<SetStateAction<Array<any>>>;
  postId: PostIdType;
  userId: UserIdType;
}

/**
 * A panel used to write and send comments, with support for markdown styling and previews
 * @author Ninjabattler
 * @param comments The current comments on the article/post
 * @param setComments Sets the comments after a new one has been posted
 * @param postId The id of the current article/post
 * @param userId The id of the current user
 */
const CommentArea: FC<CommentAreaProps> = ({
  comments,
  setComments,
  postId,
  userId,
}) => {
  const [noComment, setNoComment] = useState<boolean>(true);
  const [commenting, setCommenting] = useState<boolean>(false);
  const editor: ReactEditor = useMemo(() => withReact(createEditor()), []);
  const isDisabled = useMemo(
    () => commenting || noComment,
    [noComment, commenting],
  );

  const comment = useCallback(() => {
    const commentArea: HTMLElement = document.getElementById(
      styles.commentAreaView,
    );
    const content: string = commentArea.innerText;

    sendComment(
      { content: content, id: postId },
      userId,
      comments,
      setCommenting,
      (newComments) => {
        setComments(newComments);
      },
    );
  }, []);

  const decorate = useCallback(([node, path]) => {
    const ranges = [];
    if (!Text.isText(node)) {
      return ranges;
    }

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;

    for (const token of tokens) {
      const length = getTokenLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }

    return ranges;
  }, []);

  const addMarkdown = useCallback(
    (editor: ReactEditor, markStart: string, markEnd: string) => {
      Editor.insertText(
        editor,
        `${markStart}${Editor.string(editor, editor.selection)}${markEnd}`,
      );
    },
    [Editor],
  );

  const slateRenderLeaf = useCallback(({ attributes, leaf, children }: any) => {
    if (leaf.bold) {
      return <b {...attributes}>{children}</b>;
    } else if (leaf.italic) {
      return <i {...attributes}>{children}</i>;
    } else if (leaf.blockquote) {
      return <blockquote {...attributes}>{children}</blockquote>;
    } else if (leaf.list) {
      return (
        <span className={styles.listItem} {...attributes}>
          {children}
        </span>
      );
    } else {
      return <span {...attributes}>{children}</span>;
    }
  }, []);

  const onSlateChange = useCallback(
    (e: any) => {
      const comment: boolean = e[0].children[0].text === "";

      if (!noComment) {
        if (comment) {
          setNoComment(true);
        }
      } else if (noComment) {
        if (!comment) {
          setNoComment(false);
        }
      }
    },
    [noComment],
  );

  return (
    <section className={styles.commentArea}>
      {commenting && (
        <div className={styles.commentLoading}>
          <img src={"/Ninja placeholder.png"} alt="logo" />
        </div>
      )}

      {!commenting && (
        <Slate
          editor={editor}
          value={DEFAULT_SLATE_VALUE}
          onChange={onSlateChange}
        >
          <Editable
            decorate={decorate}
            className={styles.commentAreaView}
            placeholder="Leave a Comment!"
            renderLeaf={slateRenderLeaf}
          />
        </Slate>
      )}

      <div className={styles.commentStylingBar}>
        {COMMENT_STYLING_OPTIONS.map((option, i) => (
          <button
            key={i}
            title={isDisabled ? "" : option.title}
            disabled={isDisabled}
            onClick={() => {
              addMarkdown(editor, option.prependMark, option.appendMark);
            }}
          >
            <SvgIcon component={option.svg} />
          </button>
        ))}

        <button
          disabled={isDisabled}
          className={styles.postComment}
          onClick={comment}
        >
          Comment
        </button>
      </div>
    </section>
  );
};

export default CommentArea;
