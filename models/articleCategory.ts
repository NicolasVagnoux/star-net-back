import IArticleCategory from '../interfaces/IArticleCategory';
import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';

// ! ONLY FOR REACT ADMIN ! //

// GET all ArtCat
const getAllArtCat = async () : Promise<IArticleCategory[]> => {
    const results = await connection
    .promise()
    .query<IArticleCategory[]>('SELECT * FROM articlesCategories ORDER BY idArticle');
    return results[0];
};

// GET ArtCat by id
const getArtCatById = async (idArtCat: number): Promise<IArticleCategory> => {
    const [results] = await connection
      .promise()
      .query<IArticleCategory[]>(
        'SELECT * FROM articlesCategories WHERE id = ?',
        [idArtCat]
      );
    return results[0];
  };

// POST ArtCat
const addArtCat = async (artCat: IArticleCategory): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO articlesCategories (idArticle, idCategory) VALUES (?,?)',
      [artCat.idArticle, artCat.idCategory]
    );
  return results[0].insertId;
};

// PUT ArtCat
const updateArtCat = async (idArtCat: number, artCat: IArticleCategory): Promise<boolean> => {
    let sql = 'UPDATE articlesCategories SET ';
    const sqlValues: Array<string | number> = [];
    let oneValue = false;
    if (artCat.idArticle) {
      sql += 'idArticle = ?';
      sqlValues.push(artCat.idArticle);
      oneValue = true;
    }
    if (artCat.idCategory) {
      sql += oneValue ? ' , idCategory = ? ' : ' idCategory = ? ';
      sqlValues.push(artCat.idCategory);
      oneValue = true;
    }
    sql += ' WHERE id = ?';
    sqlValues.push(idArtCat);
  
    const results = await connection
      .promise()
      .query<ResultSetHeader>(sql, sqlValues);
    return results[0].affectedRows === 1;
};

// DELETE ArtCat
const deleteArtCat = async (idArtCat: number): Promise<boolean> => {
    const results = await connection
      .promise()
      .query<ResultSetHeader>('DELETE FROM articlesCategories WHERE id = ?', [idArtCat]);
    return results[0].affectedRows === 1;
  };

export default { getAllArtCat, getArtCatById, addArtCat, updateArtCat, deleteArtCat };