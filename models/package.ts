import IPackage from '../interfaces/IPackage';
import connection from '../db-config';
import IArticlePackage from '../interfaces/IArticlePackage';


// GET packages
const getAllPackages = async () : Promise<IPackage[]> => {
  const sql = `SELECT * FROM packages`;
  const results = await connection.promise().query<IPackage[]>(sql);
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
const getArticlePackageByIds = async (idPackage: number, idArticle: number) : Promise<IArticlePackage> => {
  const [results] = await connection
  .promise()
  .query<IArticlePackage[]>('SELECT * FROM articlesPackages WHERE idPackage = ? AND idArticle = ?',
  [idPackage, idArticle]);
  return results[0];
};

export default { getAllPackages, getPackageById, getPackagesByUser, getArticlePackageByIds };
