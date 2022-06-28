import { NextFunction, Request, RequestHandler, Response } from 'express';
import Article from '../models/article';
import Package from '../models/package';
import Category from '../models/category';
import IArticle from '../interfaces/IArticle';
import { ErrorHandler } from '../helpers/errors';
import IArticlePackage from '../interfaces/IArticlePackage';


// [MIDDLEWARE] Check if package exists
const packageExists = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idPackage } = req.params;
      const packageExists = await Package.getPackageById(Number(idPackage));
      if (!packageExists) {
        next(new ErrorHandler(404, 'This package does not exist'));
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // [MIDDLEWARE] Check if articlePackage exists
const articlePackageExists = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idPackage } = req.params;
      const { idArticle } = req.body as IArticlePackage;
      const ArticlePackageExists = await Package.getArticlePackageByIds(Number(idPackage), Number(idArticle));
      if (ArticlePackageExists) {
        next(new ErrorHandler(409, 'This article is already in this package'));
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

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

// POST article by package
const addArticleByPackage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idPackage } = req.params;
        const articlePackage = req.body as IArticle;
        articlePackage.idPackage = Number(idPackage);
        articlePackage.id = await Article.addArticleByPackage(Number(idPackage), articlePackage);
        res.status(201).json(articlePackage);
    } catch(err) {
        next(err);
    }
};

export default { packageExists, articlePackageExists, getAllPackages, getArticlesByPackage, getCategoriesByPackage, addArticleByPackage };