import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';
import IBookmark from '../interfaces/IBookmark';

// GET bookmark by user and article
const getBookmarkByUserAndArticle = async (
  idUser: number,
  idArticle: number
): Promise<IBookmark> => {
  const [results] = await connection
    .promise()
    .query<IBookmark[]>(
      'SELECT * FROM bookmarks WHERE idUser = ? AND idArticle = ?',
      [idUser, idArticle]
    );
  return results[0];
};

// POST bookmark
const addBookmark = async (
  idUser: number,
  bookmark: IBookmark
): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO bookmarks (idUser, idArticle) VALUES (?,?)',
      [idUser, bookmark.idArticle]
    );
  return results[0].insertId;
};

// DELETE bookmark
const deleteBookmark = async (
  idUser: number,
  idArticle: number
): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'DELETE FROM bookmarks WHERE idUser = ? AND idArticle = ?',
      [idUser, idArticle]
    );
  return results[0].affectedRows === 1;
};

// DELETE all bookmarks
const deleteAllBookmarks = async (idUser: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM bookmarks WHERE idUser = ?', [idUser]);
  return results[0].affectedRows >= 0;
};

export default {
  getBookmarkByUserAndArticle,
  addBookmark,
  deleteBookmark,
  deleteAllBookmarks,
};
