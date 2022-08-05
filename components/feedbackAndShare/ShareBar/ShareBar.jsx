import React, { useState } from 'react';
import styles from "./ShareBar.module.css";
import { Reddit, Twitter, LinkedIn, LinkSharp } from '@material-ui/icons';

export default function ShareBar({ title, windowServer, articleLink, pageColour }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyLink = () => { 
    window.navigator.clipboard.writeText(articleLink);
    setLinkCopied(true);
  }

  return (
    <aside id={styles.shareBar}>
      <div>
        <a onClick={copyLink} rel="noreferrer">
          <LinkSharp className={styles.shareIcon} style={{ fill: linkCopied && pageColour }} />
        </a>
      </div>
      <div>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false" rel="noreferrer">
          <Twitter className={styles.shareIcon} />
        </a>
      </div>
      <div>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(windowServer.location).replace(/'/g, "%27").replace(/"/g, "%22")}`} target="_blank" rel="noreferrer">
          <LinkedIn className={styles.shareIcon} />
        </a>
      </div>
      <div>
        <a href={`http://www.reddit.com/submit?url=${windowServer.location}&title=Ninjabattler-${title}`} target="_blank" rel="noreferrer">
          <Reddit className={styles.shareIcon} />
        </a>
      </div>
    </aside>
  )
}
