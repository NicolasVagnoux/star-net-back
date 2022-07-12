import IGuide from '../interfaces/IGuide';
import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';

// GET all guides
const getAllGuides = async () : Promise<IGuide[]> => {
    const results = await connection
    .promise()
    .query<IGuide[]>('SELECT * FROM guided ORDER BY orderNumber');
    return results[0];
};

// GET one guide
const getGuideById = async (idGuide: number): Promise<IGuide> => {
    const [results] = await connection
      .promise()
      .query<IGuide[]>(
        'SELECT * FROM guided WHERE id = ?',
        [idGuide]
      );
    return results[0];
  };

// POST guide
const addGuide = async (newGuide: IGuide): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO guided (title, mainPicture, description, orderNumber) VALUES (?,?,?,?)',
      [newGuide.title, newGuide.mainPicture, newGuide.description, newGuide.orderNumber]
    );
  return results[0].insertId;
};

// PUT guide
const updateGuide = async (idGuide: number, guide: IGuide): Promise<boolean> => {
    let sql = 'UPDATE guided SET ';
    const sqlValues: Array<string | number> = [];
    let oneValue = false;
    if (guide.title) {
      sql += 'title = ?';
      sqlValues.push(guide.title);
      oneValue = true;
    }
    if (guide.mainPicture) {
      sql += oneValue ? ' , mainPicture = ? ' : ' mainPicture = ? ';
      sqlValues.push(guide.mainPicture);
      oneValue = true;
    }
    if (guide.description) {
        sql += oneValue ? ' , description = ? ' : ' description = ? ';
        sqlValues.push(guide.description);
        oneValue = true;
      }
    if (guide.orderNumber) {
      sql += oneValue ? ' , orderNumber = ? ' : ' orderNumber = ? ';
      sqlValues.push(guide.orderNumber);
      oneValue = true;
    }
    sql += ' WHERE id = ?';
    sqlValues.push(idGuide);
  
    const results = await connection
      .promise()
      .query<ResultSetHeader>(sql, sqlValues);
    return results[0].affectedRows === 1;
};

// DELETE guide
const deleteGuide = async (idGuide: number): Promise<boolean> => {
    const results = await connection
      .promise()
      .query<ResultSetHeader>('DELETE FROM guided WHERE id = ?', [idGuide]);
    return results[0].affectedRows === 1;
  };

export default { getAllGuides, getGuideById, addGuide, updateGuide, deleteGuide };