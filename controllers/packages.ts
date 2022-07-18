import { NextFunction, Request, RequestHandler, Response } from 'express';
import Article from '../models/article';
import Package from '../models/package';
import Category from '../models/category';
import IArticle from '../interfaces/IArticle';
import { ErrorHandler } from '../helpers/errors';
import IArticlePackage from '../interfaces/IArticlePackage';
import IPackage from '../interfaces/IPackage';
import IUser from '../interfaces/IUser';

// [MIDDLEWARE] Check if package exists
const packageExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

// [MIDDLEWARE] Check if packages is already followed by user
const packageIsNotFollowedByUser = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser } = req.params;
    const { idPackage } = req.body as IPackage;
    const packageIsFollowed = await Package.getFollowedPackageByUser(
      Number(idUser),
      Number(idPackage)
    );
    const condition = [packageIsFollowed].filter(
      (packagefollowed: { id: number }) => packagefollowed?.id === Number(idPackage)
    ).length;
    if (condition > 0) {
      next(new ErrorHandler(404, 'This package is already followed'));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// [MIDDLEWARE] Check if packages is already followed by user
const isPackageFollowedByUser = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser, idPackage } = req.params;
    const packageIsFollowed = await Package.getFollowedPackageByUser(
      Number(idUser),
      Number(idPackage)
    );
    const condition = [packageIsFollowed].filter(
      (packagefollowed: { id: number; }) => packagefollowed?.id === Number(idPackage)
    ).length;
    if (condition !== 1) {
      next(new ErrorHandler(404, 'This package is not followed by user'));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// [MIDDLEWARE] Check if articlePackage exists
const articlePackageExists = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPackage } = req.params;
    const { idArticle } = req.body as IArticlePackage;
    const ArticlePackageExists = await Package.getArticlePackageByIds(
      Number(idPackage),
      Number(idArticle)
    );
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
const getAllPackages = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const packages = await Package.getAllPackages();
     // react-admin
     res.setHeader(
      'Content-Range',
      `users : 0-${packages.length}/${packages.length + 1}`
    );

    return res.status(200).json(packages);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET packages excluding user connected
const getAllPackagesExcludingUser = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser } = req.params as IUser;
    const packages = await Package.getAllPackagesExcludingUserConnected(Number(idUser));

     // react-admin
     res.setHeader(
      'Content-Range',
      `users : 0-${packages.length}/${packages.length + 1}`
    );

    return res.status(200).json(packages);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET articles by package
const getArticlesByPackage = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPackage } = req.params;
    const articles = await Article.getArticlesByPackage(Number(idPackage));
    return res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET categories by package
const getCategoriesByPackage = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPackage } = req.params;
    const categories = await Category.getCategoriesByPackage(Number(idPackage));
    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET completArticle by user and package
const getCompletedArticlesByUserAndPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser, idPackage } = req.params;
    const articles = await Article.getCompletedArticlesByUserAndPackage(
      Number(idUser),
      Number(idPackage)
    );
    return res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

// POST article by package
const addArticleByPackage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPackage } = req.params;
    const articlePackage = req.body as IArticle;
    articlePackage.idPackage = Number(idPackage);
    articlePackage.id = await Article.addArticleByPackage(
      Number(idPackage),
      articlePackage
    );
    res.status(201).json(articlePackage);
  } catch (err) {
    next(err);
  }
};

export default {
  packageExists,
  articlePackageExists,
  packageIsNotFollowedByUser,
  isPackageFollowedByUser,
  getAllPackages,
  getAllPackagesExcludingUser,
  getArticlesByPackage,
  getCategoriesByPackage,
  getCompletedArticlesByUserAndPackage,
  addArticleByPackage,
};
