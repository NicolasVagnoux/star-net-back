import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Joi from 'joi';
import Article from '../models/article';
import Category from '../models/category';
import IArticle from '../interfaces/IArticle';


// [MIDDLEWARE] Article Validation with JOI
const validateArticle = (req: Request, res: Response, next: NextFunction) => {
  let required : Joi.PresenceMode = 'optional'; // On créé une variable required qui définit si les données sont requises ou non. Si la méthode est POST, le required devient obligatoire (mais pas si la méthode est PUT).
  if (req.method === 'POST') {
      required = 'required';
  }
  const errors = Joi.object({
      title: Joi.string().max(80).presence(required),
      idUser: Joi.number().integer().min(1).presence(required),
      mainImage: Joi.string().max(255).presence(required),
      mainContent: Joi.string().presence(required),
      id: Joi.number().optional(),
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
      next(new ErrorHandler(422, errors.message));
  } else {
      next();
  }
};

// [MIDDLEWARE] Check if article exists
const articleExists = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idArticle } = req.params;
    const articleExists = await Article.getArticleById(Number(idArticle));
    if (!articleExists) {
      next(new ErrorHandler(404, 'This article does not exist'));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET all articles
const getAllArticles = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const titleFilter = req.query.titleFilter as string;
    const tagFilter = req.query.tagFilter as string;
    const articles = await Article.getAllArticles(titleFilter, tagFilter);
    return res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error : Promise returned in function argument where a void return was expected

// GET article by id
const getOneArticle = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idArticle } = req.params;
    const article = await Article.getArticleById(Number(idArticle));
    article ? res.status(200).json(article) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET categories by article
const getCategoriesByArticle = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idArticle } = req.params;
    const categories = await Category.getCategoriesByArticle(Number(idArticle));
    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// POST article
const addArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = req.body as IArticle;
    article.id = await Article.addArticle(article);
    res.status(201).json(article);
  } catch(err) {
    console.log(err)
    next(err);
  }
};

//PUT article
const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idArticle } = req.params;
    const articleUpdated = await Article.updateArticle(Number(idArticle), req.body as IArticle); //articleUpdated => boolean
    if (articleUpdated) {
      const article = await Article.getArticleById(Number(idArticle));
      res.status(200).send(article); // react-admin needs this response
    } else {
        throw new ErrorHandler(500, 'Article cannot be updated');
    }
  } catch(err) {
    next(err);
  }
};

//DELETE article
const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idArticle } = req.params;
    const article = await Article.getArticleById(Number(idArticle));
    const articleDeleted = await Article.deleteArticle(Number(idArticle)); //articleDelected => boolean
    if(articleDeleted) {
      res.status(200).send(article); //needed by react-admin
    } else {
      throw new ErrorHandler(500, 'Article cannot be deleted');
    }
  } catch(err) {
    next(err);
  }
};

export default { validateArticle, articleExists, getAllArticles, getOneArticle, getCategoriesByArticle, addArticle, updateArticle, deleteArticle };
