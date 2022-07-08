import { NextFunction, Request, RequestHandler, Response } from 'express';
import Category from '../models/category';

const getAllCategories = (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.getAllCategories();
        return res.status(200).json(categories);
    } catch(err) {
        next(err);
    }
}) as RequestHandler;

export default { getAllCategories };