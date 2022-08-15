import { GetServerSidePropsContext } from 'next';
import db from '../db/db';
import { ArticleData, TitleType } from '../types';
import selectAllArticles from '../db/selects/selectAllArticles';

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const BASE_URL = 'https://ninjabattler.ca/';

  const articles: ArticleData[] = await selectAllArticles(db)
  const articleTitles: TitleType[] = []

  articles.forEach(article => {
    articleTitles.push(article.title.toLowerCase().replace(/ /g, '_'))
  });


  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>${BASE_URL}posts/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${BASE_URL}articles/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${BASE_URL}about/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
        ${
          articleTitles.map((title) => {
            return (
              `<url>
                <loc>${BASE_URL}articles/${title}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
              </url>`
              )
          })
        }
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;