import IPackage from '../interfaces/IPackage';
import connection from '../db-config';

/////// PACKAGES //
// get packages //
const getAllPackages = async (): Promise<IPackage[]> => {
  const sql = ` SELECT * FROM articlespackages AS ap INNER JOIN articles ON ap.idArticle=articles.id INNER JOIN packages ON ap.idPackage=packages.id`;
  const results = await connection.promise().query<IPackage[]>(sql);
  return results[0];
};

export { getAllPackages };
