import { NextFunction, Request, RequestHandler, Response } from 'express';
import Category from '../models/category';

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

export default { getAllCategories };
