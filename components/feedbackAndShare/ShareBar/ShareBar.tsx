import React, { FC, useCallback } from "react";
import styles from "./ShareBar.module.scss";
import {
  Reddit,
  X,
  LinkedIn,
  LinkSharp,
  Facebook,
  Print,
} from "@mui/icons-material";
import { TitleType, UrlType, WindowServerType } from "../../../types";

interface ShareBarProps {
  title: TitleType;
  windowServer: WindowServerType;
  articleLink: UrlType;
}

/**
 * A panel shown on posts, used to like/dislike them and show the current amount of likes/dislikes
 * @author Ninjabattler
 * @param title The title of the article
 * @param windowServer A window object that is set to null on the server side
 * @param articleLink A link to the article
 */
const ShareBar: FC<ShareBarProps> = ({ title, windowServer, articleLink }) => {
  const copyLink = useCallback((): void => {
    window.navigator.clipboard.writeText(articleLink);
  }, []);

  const printPage = useCallback((): void => {
    window.print();
  }, []);

  return (
    <aside id={styles.shareBar}>
      <a onClick={copyLink} rel="noreferrer" title="Copy Link">
        <LinkSharp />
      </a>
      <a onClick={printPage} rel="noreferrer" title="Print the Page">
        <Print />
      </a>
      <a
        href="https://X.com/share?ref_src=twsrc%5Etfw"
        target="_blank"
        rel="noreferrer"
        title="Share to X"
      >
        <X />
      </a>
      <a
        href={`http://www.facebook.com/sharer.php?u=${windowServer.location}&t=${title} - Ninjabattler`}
        target="_blank"
        rel="noreferrer"
        title="Share to Facebook"
      >
        <Facebook />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          windowServer.location as string,
        )
          .replace(/'/g, "%27")
          .replace(/"/g, "%22")}`}
        target="_blank"
        rel="noreferrer"
        title="Share to LinkedIn"
      >
        <LinkedIn />
      </a>
      <a
        href={`http://www.reddit.com/submit?url=${windowServer.location}&title=${title} - Ninjabattler`}
        target="_blank"
        rel="noreferrer"
        title="Share to Reddit"
      >
        <Reddit />
      </a>
    </aside>
  );
};

export default ShareBar;
