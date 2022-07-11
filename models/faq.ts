import IFaq from '../interfaces/IFaq';
import connection from '../db-config';
import { ResultSetHeader } from 'mysql2';

// GET all faqs
const getAllFaqs = async () : Promise<IFaq[]> => {
    const results = await connection
    .promise()
    .query<IFaq[]>('SELECT * FROM faqs');
    return results[0];
};

const getFaqById = async (idFaq: number): Promise<IFaq> => {
    const [results] = await connection
      .promise()
      .query<IFaq[]>(
        'SELECT * FROM faqs WHERE id = ?',
        [idFaq]
      );
    return results[0];
  };

// POST faq
const addFaq = async (newFaq: IFaq): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO faqs (question, answer) VALUES (?,?)',
      [newFaq.question, newFaq.answer]
    );
  return results[0].insertId;
};

// PUT faq
const updateFaq = async (idFaq: number, faq: IFaq): Promise<boolean> => {
    let sql = 'UPDATE faqs SET ';
    const sqlValues: Array<string | number> = [];
    let oneValue = false;
    if (faq.question) {
      sql += 'question = ?';
      sqlValues.push(faq.question);
      oneValue = true;
    }
    if (faq.answer) {
      sql += oneValue ? ' , answer = ? ' : ' answer = ? ';
      sqlValues.push(faq.answer);
      oneValue = true;
    }
    sql += ' WHERE id = ?';
    sqlValues.push(idFaq);
  
    const results = await connection
      .promise()
      .query<ResultSetHeader>(sql, sqlValues);
    return results[0].affectedRows === 1;
};

// DELETE faq
const deleteFaq = async (idFaq: number): Promise<boolean> => {
    const results = await connection
      .promise()
      .query<ResultSetHeader>('DELETE FROM faqs WHERE id = ?', [idFaq]);
    return results[0].affectedRows === 1;
  };

export default { getAllFaqs, getFaqById, addFaq, updateFaq, deleteFaq };