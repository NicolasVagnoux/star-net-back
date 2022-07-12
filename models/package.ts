import IPackage from '../interfaces/IPackage';
import connection from '../db-config';
import IArticlePackage from '../interfaces/IArticlePackage';
import IFollowedPackage from '../interfaces/IFollowedPackage';
import { ResultSetHeader } from 'mysql2';

// GET packages (excluding followed packages by passing iduser in body)
const getAllPackages = async (idUser: number): Promise<IPackage[]> => {
  const sql = `SELECT * FROM packages WHERE id NOT IN (SELECT idPackage from followedpackages WHERE idUser = ?)`;
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
const getPackagesByUser = async (idUser: number): Promise<IPackage[]> => {
  const results = await connection
    .promise()
    .query<IPackage[]>(
      'SELECT packages.* FROM packages INNER JOIN followedPackages ON packages.id = followedPackages.idPackage WHERE followedPackages.idUser = ?',
      [idUser]
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

// POST followed package by user and package
const addFollowedPackagesByUser = async (
  idUser: number,
  followedPackage: IFollowedPackage
): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO followedpackages (idUser, idPackage) VALUES (?, ?)',
      [idUser, followedPackage.idPackage]
    );
  return results[0].insertId;
};

// DELETE followed package by user and package
const deleteFollowedPackages = async (
  idUser: number,
  idPackage: number
): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'DELETE FROM followedpackages WHERE idUser = ? AND idPackage = ?',
      [idUser, idPackage]
    );
  return results[0].affectedRows > 0;
};

// DELETE all followed package by user
const deleteAllFollowedPackage = async (idUser: number): Promise<boolean> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>('DELETE FROM followedpackages WHERE idUser = ?', [
      idUser,
    ]);
  return results[0].affectedRows >= 0;
};

export default {
  getAllPackages,
  getPackageById,
  getPackagesByUser,
  getArticlePackageByIds,
  addFollowedPackagesByUser,
  deleteFollowedPackages,
  deleteAllFollowedPackage,
};
