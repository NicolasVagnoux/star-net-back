// importe mysql pour se connecter à la base
import mysql, { Pool } from 'mysql2';

// importe la variable d'environnement
// let databaseUrl: string = process.env.CLEARDB_DATABASE_URL || '';
// retire le type de base de données
// databaseUrl = databaseUrl.substring(8);
// who doesn't love some good old effective Regex ?
// const [user, password, host, database] = databaseUrl.split(/[:@/?)<>{}\[\]\r\n/\\]+/); // eslint-disable-line

// créer l'objet pool
const connection: Pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

// exporte l'objet pool pour l'utiliser ailleurs
export default connection;
