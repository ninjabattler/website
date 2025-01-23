import React, { FC, useCallback } from "react";
import styles from "./ShareBar.module.scss";
import { Reddit, X, LinkedIn, LinkSharp, Facebook } from "@mui/icons-material";

type ShareBarProps = {
  title: string;
  windowServer: WindowServerType;
  articleLink: string;
  hide?: boolean;
};

/**
 * A panel shown on posts, used to like/dislike them and show the current amount of likes/dislikes
 * @author Ninjabattler
 * @param title The title of the article
 * @param windowServer A window object that is set to null on the server side
 * @param articleLink A link to the article
 * @param hide A boolean to hide/show the component
 */
const ShareBar: FC<ShareBarProps> = ({
  title,
  windowServer,
  articleLink,
  hide,
}) => {
  const copyLink = (): void => {
    window.navigator.clipboard.writeText(articleLink);
  };

  return (
    <aside id={styles.shareBar} className={hide ? styles.hide : ""}>
      <a onClick={copyLink} rel="noreferrer" title="Copy Link">
        <LinkSharp />
      </a>

      <a
        href={`https://twitter.com/share?ref_src=twsrc%5Etfw&u=${windowServer.location}`}
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
