import connection from '../db-config';
import IUser from '../interfaces/IUser';
import Auth from '../controllers/auth';
import { ResultSetHeader } from 'mysql2';

const getAllUsers = async () : Promise<IUser[]> => {
  const sql = 'SELECT id, firstName, lastName, phoneNumber, email, registrationDate, userPicture, idTheme, idLanguage, idRight FROM users'
  const results = await connection
  .promise()
  .query<IUser[]>(sql);
  return results[0];
}

const getUserById = async (idUser: number): Promise<IUser> => {
  const [results] = await connection
    .promise()
    .query<IUser[]>(
      'SELECT id, firstName, lastName, phoneNumber, email, registrationDate, userPicture, idTheme, idLanguage, idRight FROM users WHERE id = ?',
      [idUser]
    );
  return results[0];
};

const getUserByEmail = async (email: string): Promise<IUser> => {
  const [results] = await connection
    .promise()
    .query<IUser[]>(
      'SELECT id, firstName, lastName, phoneNumber, email, registrationDate, userPicture, idTheme, idLanguage, idRight FROM users WHERE email = ?',
      [email]
    );
  return results[0];
};

const addUser = async (user : IUser) : Promise<number> => {
  const hashedPassword = await Auth.hashPassword(user.password);
  const results = await connection
  .promise()
  .query<ResultSetHeader>('INSERT INTO users (firstName, lastName, phoneNumber, email, registrationDate, userPicture, hashedPassword) VALUES (?,?,?,?,NOW(),?,?)', 
  [user.firstName, user.lastName, user.phoneNumber, user.email, user.userPicture, hashedPassword]);
  return results[0].insertId;
};

export default { getAllUsers, getUserById, getUserByEmail, addUser };
