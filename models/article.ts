import IArticle from '../interfaces/IArticle';
import connection from '../db-config';

/////// ARTICLES //
// get articles //
const getAllArticles = async (): Promise<IArticle[]> => {
  const sql = `SELECT * FROM articles`;
  const results = await connection.promise().query<IArticle[]>(sql);
  return results[0];
};

// get article by id
const getArticleById = async (idArticle: number): Promise<IArticle> => {
  const [results] = await connection
    .promise()
    .query<IArticle[]>('SELECT * FROM articles WHERE id = ?', [idArticle]);
  return results[0];
};

// get articles by user
const getArticlesByUser = async (idUser: number): Promise<IArticle[]> => {
  const results = await connection
    .promise()
    .query<IArticle[]>(
      'SELECT articles.* FROM articles INNER JOIN bookmarks ON articles.id = bookmarks.idArticle WHERE bookmarks.idUser = ?',
      [idUser]
    );
  return results[0];
};

// GET articles by package
const getArticlesByPackage = async (idPackage: number): Promise<IArticle[]> => {
  const results = await connection
    .promise()
    .query<IArticle[]>(
      'SELECT articles.* FROM articles INNER JOIN articlesPackages ON articles.id = articlesPackages.idArticle WHERE articlesPackages.idPackage = ?',
      [idPackage]
    );
  return results[0];
};

export default { getAllArticles, getArticleById, getArticlesByUser, getArticlesByPackage };
