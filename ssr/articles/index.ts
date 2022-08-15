import db from '../../db/db';
import { selectAllArticles } from '../../db/queries';
import { ArticleData } from '../../types';

export type TitleServerProps = {
  props: {
    articles: ArticleData[];
  }
}

export const articlesServerSideProps = async (): Promise<TitleServerProps> => {
  const articlesArray: ArticleData[] = await selectAllArticles(db)

  return {
    props: {
      articles: articlesArray,
    }
  }
}