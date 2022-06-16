import { NextFunction, Request, RequestHandler, Response } from 'express';
import Article from '../models/article';
import Package from '../models/package';
import Category from '../models/category';

// GET packages
const getAllPackages = (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const packages = await Package.getAllPackages();
        return res.status(200).json(packages);
    } catch(err) {
        next(err);
    }
}) as RequestHandler ;

// GET articles by package
const getArticlesByPackage = (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idPackage } = req.params;
        const articles = await Article.getArticlesByPackage(Number(idPackage));
        return res.status(200).json(articles);
    } catch(err) {
        next(err);
    }
}) as RequestHandler ;

// GET categories by package
const getCategoriesByPackage = (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idPackage } = req.params;
        const categories = await Category.getCategoriesByPackage(Number(idPackage));
        return res.status(200).json(categories);
    } catch(err) {
        next(err);
    }
}) as RequestHandler ;

export default { getAllPackages, getArticlesByPackage, getCategoriesByPackage };