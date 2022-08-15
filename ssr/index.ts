import db from '../db/db';
import selectNewestArticle from '../db/selects/selectNewestArticle';
import { ArticleData } from '../types';

export type IndexServerSideData = {
  props: ArticleData;
}

export const homePageServerSideProps = async (): Promise<IndexServerSideData> => {
  const newestArticle: ArticleData = await selectNewestArticle(db);
  
  return {
    props: newestArticle
  }
}