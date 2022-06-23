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
      'SELECT id, firstName, lastName, phoneNumber, email, hashedPassword, registrationDate, userPicture, idTheme, idLanguage, idRight FROM users WHERE email = ?',
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

const updateUser = async (idUser : number, user : IUser) : Promise<boolean> => {
  let sql = 'UPDATE users SET ';
  const sqlValues : Array<string | number> = [];
  let oneValue  = false;
  if (user.firstName) {
    sql += 'firstName = ?';
    sqlValues.push(user.firstName);
    oneValue = true;
}
if (user.lastName) {
    sql += oneValue ? ' , lastName = ? ' : ' lastName = ? ';
    sqlValues.push(user.lastName);
    oneValue = true;
}
if (user.phoneNumber) {
  sql += oneValue ? ' , phoneNumber = ? ' : ' phoneNumber = ? ';
  sqlValues.push(user.phoneNumber);
  oneValue = true;
}
if (user.email) {
  sql += oneValue ? ' , email = ? ' : ' email = ? ';
  sqlValues.push(user.email);
  oneValue = true;
}
if (user.userPicture) {
  sql += oneValue ? ' , userPicture = ? ' : ' userPicture = ? ';
  sqlValues.push(user.userPicture);
  oneValue = true;
}
if (user.password) {
  sql += oneValue ? ', hashedPassword = ? ' : ' hashedPassword = ? ';
  const hashedPassword : string = await Auth.hashPassword(user.password);
  sqlValues.push(hashedPassword);
  oneValue = true;
}
if (user.idTheme) {
  sql += oneValue ? ' , idTheme = ? ' : ' idTheme = ? ';
  sqlValues.push(user.idTheme);
  oneValue = true;
}
if (user.idLanguage) {
  sql += oneValue ? ' , idLanguage = ? ' : ' idLanguage = ? ';
  sqlValues.push(user.idLanguage);
  oneValue = true;
}
if (user.idRight) {
  sql += oneValue ? ' , idRight = ? ' : ' idRight = ? ';
  sqlValues.push(user.idRight);
  oneValue = true;
}
sql += ' WHERE id = ?';
    sqlValues.push(idUser);

    const results = await connection
    .promise()
    .query<ResultSetHeader>(sql, sqlValues);
    return results[0].affectedRows === 1;
};

const deleteUser = async (idUser : number) : Promise<boolean> => {
  const results = await connection
  .promise()
  .query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [idUser]);
  return results[0].affectedRows === 1; //boolean
};

export default { getAllUsers, getUserById, getUserByEmail, addUser, updateUser, deleteUser };
