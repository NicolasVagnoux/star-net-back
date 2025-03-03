import IPackage from '../interfaces/IPackage';
import connection from '../db-config';
import IArticlePackage from '../interfaces/IArticlePackage';
import IFollowedPackage from '../interfaces/IFollowedPackage';
import { ResultSetHeader } from 'mysql2';

// GET all packages
const getAllPackages = async (): Promise<IPackage[]> => {
  const sql = `SELECT * FROM packages`;
  const results = await connection.promise().query<IPackage[]>(sql);
  return results[0];
};

// GET packages (excluding followed packages by passing iduser in body)
const getAllPackagesExcludingUserConnected = async (
  idUser: number
): Promise<IPackage[]> => {
  const sql = `SELECT * FROM packages WHERE id NOT IN (SELECT idPackage from followedPackages WHERE idUser = ?)`;
  const results = await connection.promise().query<IPackage[]>(sql, [idUser]);
  return results[0];
};

// GET package by id
const getPackageById = async (idPackage: number): Promise<IPackage> => {
  const [results] = await connection
    .promise()
    .query<IPackage[]>('SELECT * FROM packages WHERE id = ?', [idPackage]);
  return results[0];
};

// GET packages by idUser
const getPackagesByUserId = async (idUser: number): Promise<IPackage[]> => {
  const results = await connection
    .promise()
    .query<IPackage[]>(
      'SELECT packages.* FROM packages INNER JOIN followedPackages ON packages.id = followedPackages.idPackage WHERE followedPackages.idUser = ?',
      [idUser]
    );
  return results[0];
};

// GET followedpackages by idUser
const getFollowedPackageByUser = async (
  idUser: number,
  idPackage: number
): Promise<IPackage> => {
  const [results] = await connection
    .promise()
    .query<IPackage[]>(
      'SELECT packages.* FROM packages INNER JOIN followedPackages ON packages.id = followedPackages.idPackage WHERE followedPackages.idUser = ? AND packages.id = ?',
      [idUser, idPackage]
    );
  return results[0];
};

// GET articlesPackages by ids
const getArticlePackageByIds = async (
  idPackage: number,
  idArticle: number
): Promise<IArticlePackage> => {
  const [results] = await connection
    .promise()
    .query<IArticlePackage[]>(
      'SELECT * FROM articlesPackages WHERE idPackage = ? AND idArticle = ?',
      [idPackage, idArticle]
    );
  return results[0];
};

// POST one package
const addPackage = async (packageItem: IPackage): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO packages (name, description) VALUES (?, ?)',
      [packageItem.name, packageItem.description]
    );
  return results[0].insertId;
};

//PUT article
const updateOnePackage = async (
  idPackage: number,
  packageItem: IPackage
): Promise<boolean> => {
  let sql = 'UPDATE packages SET ';
  const sqlValues: Array<string | number> = [];
  let oneValue = false;
  if (packageItem.name) {
    sql += 'name = ?';
    sqlValues.push(packageItem.name);
    oneValue = true;
  }
  if (packageItem.description) {
    sql += oneValue ? ' , description = ? ' : ' description = ? ';
    sqlValues.push(packageItem.description);
    oneValue = true;
  }
  sql += ' WHERE id = ?';
  sqlValues.push(idPackage);

  const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
  return results[0].affectedRows === 1;
};

// POST followed package by user and package
const addFollowedPackagesByUser = async (
  idUser: number,
  followedPackage: IFollowedPackage
): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO followedPackages (idUser, idPackage) VALUES (?, ?)',
      [idUser, followedPackage.idPackage]
    );
  return results[0].insertId;
};

//DELETE package
const deletePackage = async (idPackage: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM packages WHERE id = ?', [idPackage]);
  return results[0].affectedRows === 1;
};

// DELETE followed package by user and package
const deleteFollowedPackageByUserAndPackage = async (
  idUser: number,
  idPackage: number
): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'DELETE FROM followedPackages WHERE idUser = ? AND idPackage = ?',
      [idUser, idPackage]
    );
  return results[0].affectedRows > 0;
};

// DELETE all followed package by user
const deleteAllFollowedPackages = async (idUser: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM followedPackages WHERE idUser = ?', [
      idUser,
    ]);
  return results[0].affectedRows >= 0;
};

export default {
  getAllPackages,
  getAllPackagesExcludingUserConnected,
  getPackageById,
  getPackagesByUserId,
  getFollowedPackageByUser,
  getArticlePackageByIds,
  addFollowedPackagesByUser,
  addPackage,
  updateOnePackage,
  deletePackage,
  deleteFollowedPackageByUserAndPackage,
  deleteAllFollowedPackages,
};
