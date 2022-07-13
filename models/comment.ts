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

// POST comment
const addComment = async (
  idUser: number,
  comment: IComment
): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO comments (idUser, title, text, rating, idArticle) VALUES (?,?,?,?,?)',
      [idUser, comment.title, comment.text, comment.rating, comment.idArticle]
    );
  return results[0].insertId;
};

export default { addComment, getCommentsByArticle };
