import IComment from "../interfaces/IComment";
import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';

// POST comment
const addComment = async (idUser : number, comment : IComment) : Promise<number> => {
    const results = await connection
    .promise()
    .query<ResultSetHeader>('INSERT INTO comments (idUser, text, rating, idArticle) VALUES (?,?,?,?)',
    [idUser,comment.text,comment.rating, comment.idArticle]);
    return results[0].insertId;
};

export default { addComment};