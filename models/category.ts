import ICategory from '../interfaces/ICategory';
import connection from '../db-config';
import IArticleCategory from '../interfaces/IArticleCategory';
import { ResultSetHeader } from 'mysql2';

// GET all categories
const getAllCategories = async () : Promise<IArticleCategory[]> => {
  const results = await connection
  .promise()
  .query<IArticleCategory[]>('SELECT * FROM categories');
  return results[0];
};

// GET category by id
const getCategoryById = async (idCategory: number): Promise<ICategory> => {
  const [results] = await connection
    .promise()
    .query<ICategory[]>(
      'SELECT * FROM categories WHERE id = ?',
      [idCategory]
    );
  return results[0];
};

// GET categories by package
const getCategoriesByPackage = async (
  idPackage: number
): Promise<ICategory[]> => {
  const results = await connection
    .promise()
    .query<ICategory[]>(
      'SELECT categories.* FROM categories INNER JOIN packagesCategories ON categories.id = packagesCategories.idCategory WHERE packagesCategories.idPackage = ?',
      [idPackage]
    );
  return results[0];
};

// GET categories by articles
const getCategoriesByArticle = async (
  idArticle: number
): Promise<ICategory[]> => {
  const results = await connection
    .promise()
    .query<ICategory[]>(
      'SELECT categories.* FROM categories INNER JOIN articlesCategories ON categories.id = articlesCategories.idCategory WHERE articlesCategories.idArticle = ?',
      [idArticle]
    );

  return results[0];
};

// POST category
const addCategory = async (category: ICategory): Promise<number> => {
  const results = await connection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO categories (name, description) VALUES (?,?)',
      [category.name, category.description]
    );
  return results[0].insertId;
};

// PUT category
const updateCategory = async (idCategory: number, category: ICategory): Promise<boolean> => {
    let sql = 'UPDATE categories SET ';
    const sqlValues: Array<string | number> = [];
    let oneValue = false;
    if (category.name) {
      sql += 'name = ?';
      sqlValues.push(category.name);
      oneValue = true;
    }
    if (category.description) {
      sql += oneValue ? ' , description = ? ' : ' description = ? ';
      sqlValues.push(category.description);
      oneValue = true;
    }
    sql += ' WHERE id = ?';
    sqlValues.push(idCategory);
  
    const results = await connection
      .promise()
      .query<ResultSetHeader>(sql, sqlValues);
    return results[0].affectedRows === 1;
};

// DELETE category
const deleteCategory = async (idCategory: number): Promise<boolean> => {
    const results = await connection
      .promise()
      .query<ResultSetHeader>('DELETE FROM categories WHERE id = ?', [idCategory]);
    return results[0].affectedRows === 1;
  };

export default { getAllCategories, getCategoryById, getCategoriesByPackage, getCategoriesByArticle, addCategory, updateCategory, deleteCategory };
