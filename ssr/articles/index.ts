import db from '../../db/db';
import selectAllArticles from '../../db/selects/selectAllArticles';
import { ArticleData } from '../../types';

export type ArticlesServerProps = {
  props: {
    articles: ArticleData[];
  }
}

export const articlesServerSideProps = async (): Promise<ArticlesServerProps> => {
  const articlesArray: ArticleData[] = await selectAllArticles(db)

  return {
    props: {
      articles: articlesArray,
    }
  }
}