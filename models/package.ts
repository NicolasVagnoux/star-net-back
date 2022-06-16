import IPackage from '../interfaces/IPackage';
import connection from '../db-config';


// GET packages
const getAllPackages = async () : Promise<IPackage[]> => {
  const sql = `SELECT * FROM packages`;
  const results = await connection.promise().query<IPackage[]>(sql);
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

export default { getAllPackages, getPackagesByUser };
