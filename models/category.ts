import ICategory from '../interfaces/IArticle';
import connection from '../db-config';

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

export default { getCategoriesByPackage, getCategoriesByArticle };
