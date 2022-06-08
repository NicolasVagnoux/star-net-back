import connection from '../db-config';
import IUser from '../interfaces/IUser';

const getUserById = async (idUser: number): Promise<IUser> => {
  const [results] = await connection
    .promise()
    .query<IUser[]>(
      'SELECT firstName, lastName, email, phoneNumber, registrationDate FROM users WHERE id = ?',
      [idUser]
    );
  return results[0];
};

export default { getUserById };
