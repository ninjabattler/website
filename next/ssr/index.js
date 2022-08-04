import db from '../db/db';
import selectNewestArticle from '../db/selects/selectNewestArticle';

export const homePageServerSideProps = async () => {
  const newestArticle = await selectNewestArticle(db);
  
  return {
    props: newestArticle
  }
}