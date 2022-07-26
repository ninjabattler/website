import requestIp from 'request-ip';
import db from '../../db/db';
import { selectSingleArticle, selectUserId, selectUsersLike, insertNewUser } from '../../db/queries';
import noCommentMessages from '../../constants/noCommentMessages.json';

export const articlePageServerSideProps = async (req) => {
  const ip = requestIp.getClientIp(req.req)

  let userId = await selectUserId(db, ip)

  if (!userId[0]) {
    userId = await insertNewUser(db, ip)
  }

  const randomQuoteIndex = Math.floor(Math.random() * noCommentMessages.length);

  const userLike = await selectUsersLike(db, userId[0].id)
  const articleTitle = req.query.title.replace(/_/g, ' ');
  const articleData = await selectSingleArticle(db, articleTitle);

  let liked = false;
  let disliked = false;

  if (userLike[0]) {
    if (userLike[0].liked) {
      liked = true;
    } else {
      disliked = true;
    }
  }

  if (!articleData[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      articleData: { ...articleData[0] },
      userId: userId[0].id,
      liked,
      disliked,
      url: `https://ninjabattler.ca/articles/${req.params.title}`,
      randomQuoteIndex
    }
  }
};