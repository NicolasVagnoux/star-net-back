import IPackageCategory from '../interfaces/IPackageCategory';
import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';

// ! ONLY FOR REACT ADMIN ! //

// GET all PackCat
const getAllPackCat = async () : Promise<IPackageCategory[]> => {
    const results = await connection
    .promise()
    .query<IPackageCategory[]>('SELECT * FROM packagesCategories ORDER BY idPackage');
    return results[0];
};

// GET PackCat by id
const getPackCatById = async (idPackCat: number): Promise<IPackageCategory> => {
    const [results] = await connection
      .promise()
      .query<IPackageCategory[]>(
        'SELECT * FROM packagesCategories WHERE id = ?',
        [idPackCat]
      );
    return results[0];
  };

// POST PackCat
const addPackCat = async (packCat: IPackageCategory): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO packagesCategories (idPackage, idCategory) VALUES (?,?)',
      [packCat.idPackage, packCat.idCategory]
    );
  return results[0].insertId;
};

// PUT PackCat
const updatePackCat = async (idPackCat: number, packCat: IPackageCategory): Promise<boolean> => {
    let sql = 'UPDATE packagesCategories SET ';
    const sqlValues: Array<string | number> = [];
    let oneValue = false;
    if (packCat.idPackage) {
      sql += 'idPackage = ?';
      sqlValues.push(packCat.idPackage);
      oneValue = true;
    }
    if (packCat.idCategory) {
      sql += oneValue ? ' , idCategory = ? ' : ' idCategory = ? ';
      sqlValues.push(packCat.idCategory);
      oneValue = true;
    }
    sql += ' WHERE id = ?';
    sqlValues.push(idPackCat);
  
    const results = await connection
      .promise()
      .query<ResultSetHeader>(sql, sqlValues);
    return results[0].affectedRows === 1;
};

// DELETE PackCat
const deletePackCat = async (idPackCat: number): Promise<boolean> => {
    const results = await connection
      .promise()
      .query<ResultSetHeader>('DELETE FROM packagesCategories WHERE id = ?', [idPackCat]);
    return results[0].affectedRows === 1;
  };

export default { getAllPackCat, getPackCatById, addPackCat, updatePackCat, deletePackCat };