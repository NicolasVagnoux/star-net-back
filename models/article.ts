import IArticle from '../interfaces/IArticle';
import ICompletedArticle from '../interfaces/ICompletedArticle';
import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';

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
    .query<IArticle[]>(
      'SELECT id, title, idUser, mainImage, mainContent, DATE_FORMAT(creationDate, "%d/%m/%Y") AS creationDate, DATE_FORMAT(lastUpdateDate, "%d/%m/%Y") AS lastUpdateDate FROM articles WHERE id = ?',
      [idArticle]
    );
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

// GET completedArticles by package
const getCompletedArticlesByUserAndPackage = async (
  idUser: number,
  idPackage: number
): Promise<ICompletedArticle[]> => {
  const results = await connection
    .promise()
    .query<ICompletedArticle[]>(
      'SELECT * FROM completedArticles AS CA INNER JOIN articlesPackages AS AP ON AP.idArticle = CA.idArticle WHERE CA.idUser= ? AND AP.idPackage = ? ',
      [idUser, idPackage]
    );
  return results[0];
};

//POST article
const addArticle = async (article: IArticle): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO articles (title, idUser, mainImage, mainContent, creationDate, lastUpdateDate) VALUES (?,?,?,?,NOW(),NOW())',
      [article.title, article.idUser, article.mainImage, article.mainContent]
    );
  return results[0].insertId;
};

//POST article by package
const addArticleByPackage = async (
  idPackage: number,
  articlePackage: IArticle
) => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO articlesPackages (idPackage, idArticle) VALUES (?,?)',
      [idPackage, articlePackage.idArticle]
    );
  return results[0].insertId;
};

//PUT article
const updateArticle = async (
  idArticle: number,
  article: IArticle
): Promise<boolean> => {
  let sql = 'UPDATE articles SET ';
  const sqlValues: Array<string | number> = [];
  let oneValue = false;
  if (article.title) {
    sql += 'title = ?';
    sqlValues.push(article.title);
    oneValue = true;
  }
  if (article.idUser) {
    sql += oneValue ? ' , idUser = ? ' : ' idUser = ? ';
    sqlValues.push(article.idUser);
    oneValue = true;
  }
  if (article.mainImage) {
    sql += oneValue ? ' , mainImage = ? ' : ' mainImage = ? ';
    sqlValues.push(article.mainImage);
    oneValue = true;
  }
  if (article.mainContent) {
    sql += oneValue ? ' , mainContent = ? ' : ' mainContent = ? ';
    sqlValues.push(article.mainContent);
    oneValue = true;
  }
  if (
    article.title ||
    article.idUser ||
    article.mainImage ||
    article.mainContent
  ) {
    sql += ' , lastUpdateDate = NOW() ';
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idArticle);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

//DELETE article
const deleteArticle = async (idArticle: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM articles WHERE id = ?', [idArticle]);
  return results[0].affectedRows === 1;
};

export default {
  getAllArticles,
  getArticleById,
  getArticlesByUser,
  getArticlesByPackage,
  getCompletedArticlesByUserAndPackage,
  addArticle,
  addArticleByPackage,
  updateArticle,
  deleteArticle,
};
