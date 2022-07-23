import db from '../../db/db';
import { selectAllArticles } from '../../db/queries';

export const articlesServerSideProps = async () => {

  const articlesArray = await selectAllArticles(db)

  return {
    props: {
      articles: articlesArray,
    }
  }
}