import IArticlePackage from '../interfaces/IArticlePackage';
import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';

// ! ONLY FOR REACT ADMIN ! //

// GET all ArtPack
const getAllArtPack = async () : Promise<IArticlePackage[]> => {
    const results = await connection
    .promise()
    .query<IArticlePackage[]>('SELECT * FROM articlesPackages ORDER BY idArticle');
    return results[0];
};

// GET ArtPack by id
const getArtPackById = async (idArtPack: number): Promise<IArticlePackage> => {
    const [results] = await connection
      .promise()
      .query<IArticlePackage[]>(
        'SELECT * FROM articlesPackages WHERE id = ?',
        [idArtPack]
      );
    return results[0];
  };

// POST ArtPack
const addArtPack = async (artPack: IArticlePackage): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO articlesPackages (idArticle, idPackage) VALUES (?,?)',
      [artPack.idArticle, artPack.idPackage]
    );
  return results[0].insertId;
};

// PUT ArtPack
const updateArtPack = async (idArtPack: number, artPack: IArticlePackage): Promise<boolean> => {
    let sql = 'UPDATE articlesPackages SET ';
    const sqlValues: Array<string | number> = [];
    let oneValue = false;
    if (artPack.idArticle) {
      sql += 'idArticle = ?';
      sqlValues.push(artPack.idArticle);
      oneValue = true;
    }
    if (artPack.idPackage) {
      sql += oneValue ? ' , idPackage = ? ' : ' idPackage = ? ';
      sqlValues.push(artPack.idPackage);
      oneValue = true;
    }
    sql += ' WHERE id = ?';
    sqlValues.push(idArtPack);
  
    const results = await connection
      .promise()
      .query<ResultSetHeader>(sql, sqlValues);
    return results[0].affectedRows === 1;
};

// DELETE ArtPack
const deleteArtPack = async (idArtPack: number): Promise<boolean> => {
    const results = await connection
      .promise()
      .query<ResultSetHeader>('DELETE FROM articlesPackages WHERE id = ?', [idArtPack]);
    return results[0].affectedRows === 1;
  };

export default { getAllArtPack, getArtPackById, addArtPack, updateArtPack, deleteArtPack };