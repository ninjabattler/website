import React from 'react';
import styles from "./ShareBar.module.css";
import { Reddit, Twitter, LinkedIn, Facebook, } from '@material-ui/icons';

export default function ShareBar({ title }) {
  return (
    <aside id={styles.shareBar}>
      <div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small">
        <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location).replace(/'/g, "%27").replace(/"/g, "%22")}`} className="fb-xfbml-parse-ignore" rel="noreferrer">
          <Facebook className={styles.shareIcon} />
        </a>
      </div>
      <div>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false" rel="noreferrer">
          <Twitter className={styles.shareIcon} />
        </a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
      <div>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location).replace(/'/g, "%27").replace(/"/g, "%22")}`} target="_blank" rel="noreferrer">
          <LinkedIn className={styles.shareIcon} />
        </a>
      </div>
      <div>
        <a href={`http://www.reddit.com/submit?url=${window.location}&title=Ninjabattler-${title}`} target="_blank" rel="noreferrer">
          <Reddit className={styles.shareIcon} />
        </a>
      </div>
    </aside>
  )
}

