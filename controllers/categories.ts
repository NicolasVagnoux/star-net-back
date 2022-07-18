import { NextFunction, Request, RequestHandler, Response } from 'express';
import ICategory from '../interfaces/ICategory';
import Category from '../models/category';
import { ErrorHandler } from '../helpers/errors';

const getAllCategories = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.getAllCategories();
    
    // react-admin
    res.setHeader(
      'Content-Range',
      `users : 0-${categories.length}/${categories.length + 1}`
    );

    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET category by id
const getOneCategory = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idCategory } = req.params;
    const category = await Category.getCategoryById(Number(idCategory));
    category ? res.status(200).json(category) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// POST category
const addCategory = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = req.body as ICategory;
    category.id = await Category.addCategory(category);
    res.status(201).json(category);
  } catch(err) {
    console.log(err)
    next(err);
  }
}) as RequestHandler;

// PUT category
const updateCategory = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idCategory } = req.params;
    const categoryUpdated = await Category.updateCategory(Number(idCategory), req.body as ICategory); //categoryUpdated => boolean
    if (categoryUpdated) {
      const category = await Category.getCategoryById(Number(idCategory));
      res.status(200).send(category); // react-admin needs this response
    } else {
        throw new ErrorHandler(500, 'Category cannot be updated');
    }
  } catch(err) {
    next(err);
  }
}) as RequestHandler;

// DELETE category
const deleteCategory = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idCategory } = req.params;
    const category = await Category.getCategoryById(Number(idCategory));
    const categoryDeleted = await Category.deleteCategory(Number(idCategory)); //categoryDelected => boolean
    if(categoryDeleted) {
      res.status(200).send(category); //needed by react-admin
    } else {
      throw new ErrorHandler(500, 'Category cannot be deleted');
    }
  } catch(err) {
    next(err);
  }
}) as RequestHandler;

export default { getAllCategories, getOneCategory, addCategory, updateCategory, deleteCategory };
