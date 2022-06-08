import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
// import { number } from 'joi';
import Article from '../models/article';
import User from '../models/user';

// [MIDDLEWARE] Check if user exists
const userExists = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    const userExists = await User.getUserById(Number(idUser));
    if (!userExists) {
      next(new ErrorHandler(404, 'This user does not exist'));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET user by ID
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    const user = await User.getUserById(Number(idUser));
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// get articles by user (bookmark)
const getArticlesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser } = req.params; // le params récupéré dans la requête est un string
    const articles = await Article.getArticlesByUser(Number(idUser)); // conversion avec Number du string en number
    return res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

export default { userExists, getUserById, getArticlesByUser };
