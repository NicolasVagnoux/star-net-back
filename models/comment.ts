import IComment from '../interfaces/IComment';
import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';

// GET comments by article
const getCommentsByArticle = async (idArticle: number): Promise<IComment[]> => {
  const results = await connection
    .promise()
    .query<IComment[]>(
      'SELECT id, title, text, DATE_FORMAT(date, "%d/%m/%Y") AS date, report, idUser, idArticle FROM comments WHERE idArticle = ?',
      [idArticle]
    );
  return results[0];
};

// GET all comments
const getAllComments = async (): Promise<IComment[]> => {
  const sql = 'SELECT * FROM comments';
  const results = await connection.promise().query<IComment[]>(sql);
  return results[0];
};

//GET comment by id
const getCommentById = async (idComment: number): Promise<IComment> => {
  const [results] = await connection
    .promise()
    .query<IComment[]>('SELECT * FROM comments WHERE id = ?', [idComment]);
  return results[0];
};

// GET comment by user
const getCommentByUser = async (): Promise<IComment[]> => {
  const sql = 'SELECT * FROM comments WHERE idUser=?';
  const results = await connection.promise().query<IComment[]>(sql);
  return results[0];
};

// POST comment
const addComment = async (
  idUser: number,
  comment: IComment
): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO comments (idUser, title, text, date, idArticle) VALUES (?,?,?,NOW(),?)',
      [idUser, comment.title, comment.text, comment.idArticle]
    );
  return results[0].insertId;
};

//  PUT comment by user
const updateCommentByUser = async (idUser: number): Promise<boolean> => {
  const sql = `UPDATE comments SET idUser = (SELECT id FROM users WHERE lastName='Inconnu') WHERE idUser= ?`;
  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, [idUser]);
  return results[0].affectedRows > 0;
};
// DELETE faq
const deleteComment = async (idComment: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM comments WHERE id = ?', [idComment]);
  return results[0].affectedRows === 1;
};

export default {
  addComment,
  getCommentsByArticle,
  getCommentByUser,
  getAllComments,
  updateCommentByUser,
  getCommentById,
  deleteComment,
};
