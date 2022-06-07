import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as Article from '../models/article';

// get all articles
const getAllArticles = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await Article.getAllArticles();
    return res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
}) as RequestHandler; // Used to avoid eslint error : Promise returned in function argument where a void return was expected

// get article by id
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

export default { getAllArticles, getOneArticle };
