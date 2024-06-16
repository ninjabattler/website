import { GetServerSidePropsContext } from "next";
import { getCachedClient } from "../sanity/lib/getClient";
import { getSitemapDataQuery } from "../sanity/lib/queries";

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const BASE_URL = "https://ninjabattler.ca/";

  // const articles: ArticleData[] = await selectAllArticles(db);
  const articles: ArticleData[] = await getCachedClient()(
    getSitemapDataQuery(),
  );

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
        ${articles.map((article) => {
          return `<url>
                <loc>${BASE_URL}articles/${article.slug}</loc>
                <lastmod>${article._updatedAt}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
              </url>`;
        })}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
