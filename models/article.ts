import IArticle from '../interfaces/IArticle';
import connection from '../db-config';

/////// ARTICLES //
// get articles //
const getAllArticles = async (): Promise<IArticle[]> => {
  let sql = `SELECT * FROM articles`;
  const results = await connection.promise().query<IArticle[]>(sql);
  return results[0];
};

// get article by id //
const getArticleById = async (idArticle: number): Promise<IArticle> => {
  const [results] = await connection
    .promise()
    .query<IArticle[]>('SELECT * FROM articles WHERE id = ?', [idArticle]);
  return results[0];
};

export { getAllArticles, getArticleById };
