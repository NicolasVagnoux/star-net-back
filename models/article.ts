import IArticle from '../interfaces/IArticle';
import connection from '../db-config';

/////// ARTICLES //
// get articles //
const getAllArticles = async (): Promise<IArticle[]> => {
  const sql = `SELECT id, title, idUser, mainImage, mainContent, DATE_FORMAT(creationDate, '%d/%m/%Y') AS creationDate, DATE_FORMAT(lastUpdateDate, '%d/%m/%Y') AS lastUpdateDate FROM articles`;
  const results = await connection.promise().query<IArticle[]>(sql);
  return results[0];
};

// get article by id
const getArticleById = async (idArticle: number): Promise<IArticle> => {
  const [results] = await connection
    .promise()
    .query<IArticle[]>('SELECT id, title, idUser, mainImage, mainContent, DATE_FORMAT(creationDate, "%d/%m/%Y") AS creationDate, DATE_FORMAT(lastUpdateDate, "%d/%m/%Y") AS lastUpdateDate FROM articles WHERE id = ?', [idArticle]);
  return results[0];
};

// get articles by user
const getArticlesByUser = async (idUser: number): Promise<IArticle[]> => {
  const results = await connection
    .promise()
    .query<IArticle[]>(
      'SELECT a.id, a.title, a.idUser, a.mainImage, a.mainContent, DATE_FORMAT(a.creationDate, "%d/%m/%Y") AS creationDate, DATE_FORMAT(a.lastUpdateDate, "%d/%m/%Y") AS lastUpdateDate FROM articles a INNER JOIN bookmarks ON a.id = bookmarks.idArticle WHERE bookmarks.idUser = ?',
      [idUser]
    );
  return results[0];
};

// GET articles by package
const getArticlesByPackage = async (idPackage: number): Promise<IArticle[]> => {
  const results = await connection
    .promise()
    .query<IArticle[]>(
      'SELECT a.id, a.title, a.idUser, a.mainImage, a.mainContent, DATE_FORMAT(a.creationDate, "%d/%m/%Y") AS creationDate, DATE_FORMAT(a.lastUpdateDate, "%d/%m/%Y") AS lastUpdateDate FROM articles a INNER JOIN articlesPackages ON a.id = articlesPackages.idArticle WHERE articlesPackages.idPackage = ?',
      [idPackage]
    );
  return results[0];
};

export default { getAllArticles, getArticleById, getArticlesByUser, getArticlesByPackage };
