import db from '../../db/db';
const { selectAllArticles } = require('../../db/queries');

export default async function handler(req, res) {
  await selectAllArticles(db)
    .then(async (articles) => {
      const articleTitles = []

      articles.forEach(article => {
        articleTitles.push(article.title.toLowerCase().replace(/ /g, '_'))
      });

      res.status(200).json({
        articles: articleTitles
      })
    })
}