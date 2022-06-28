import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Article from '../models/article';
import User from '../models/user';
import Package from '../models/package';
import Bookmark from '../models/bookmark';
import Comment from '../models/comment';
import Joi from 'joi';
import IUser from '../interfaces/IUser';
import IBookmark from '../interfaces/IBookmark';
import IComment from '../interfaces/IComment';

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

// [MIDDLEWARE] User Validation with JOI
const validateUser = (req: Request, res: Response, next: NextFunction) => {
  let required : Joi.PresenceMode = 'optional'; // On créé une variable required qui définit si les données sont requises ou non. Si la méthode est POST, le required devient obligatoire (mais pas si la méthode est PUT).
  if (req.method === 'POST') {
      required = 'required';
  }
  const errors = Joi.object({
      firstName: Joi.string().max(80).presence(required),
      lastName: Joi.string().max(80).presence(required),
      phoneNumber: Joi.string().max(40).optional(),
      email: Joi.string().email().max(150).presence(required),
      userPicture: Joi.string().max(500).optional(),
      password: Joi.string().min(6).max(50).presence(required),
      idTheme: Joi.number().min(1).max(10).optional(),
      idLanguage: Joi.number().min(1).max(10).optional(),
      idRight: Joi.number().min(1).max(10).optional(),
      id: Joi.number().optional(),
  }).validate(req.body, { abortEarly: false }).error;
  if (errors) {
      next(new ErrorHandler(422, errors.message));
  } else {
      next();
  }
};

// [MIDDLEWARE] Check if email is free
const emailIsFree = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body as IUser;
    const emailExists = await User.getUserByEmail(email);
    if (emailExists) {
      next(new ErrorHandler(409, 'Email is already used'));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

//GET all users
const getAllUsers = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.getAllUsers();
    return res.status(200).json(users);
  } catch(err) {
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

// GET articles by user (bookmark)
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

// GET packages by user (followedPackages)
const getPackagesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser } = req.params; // le params récupéré dans la requête est un string
    const packages = await Package.getPackagesByUser(Number(idUser)); // conversion avec Number du string en number
    return res.status(200).json(packages);
  } catch (err) {
    next(err);
  }
};

//POST user
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const user = req.body as IUser; // On prend le body qu'on met dans une constante user.
      user.id = await User.addUser(user); // Puis on rajoute à cette constante l'id qui vient de l'insertId de la requête.
      res.status(201).json(user);
  } catch(err) {
      next(err);
  }
};

//POST bookmark by user
const addBookmarkByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { idUser } = req.params;
      const bookmark = req.body as IBookmark;
      bookmark.idUser = Number(idUser);
      bookmark.id = await Bookmark.addBookmark(Number(idUser), bookmark);
      res.status(201).json(bookmark);
  } catch(err) {
      next(err);
  }
};

//POST comment by user
const addCommentByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { idUser } = req.params;
      const comment = req.body as IComment;
      comment.idUser = Number(idUser);
      comment.id = await Comment.addComment(Number(idUser), comment);
      res.status(201).json(comment);
  } catch(err) {
      next(err);
  }
};

//PUT user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    const userUpdated = await User.updateUser(Number(idUser), req.body as IUser); //userUpdated is a boolean, returned by the model
    if (userUpdated) {
      const user = await User.getUserById(Number(idUser));
      res.status(200).send(user); // react-admin needs this response
  } else {
      throw new ErrorHandler(500, 'User cannot be updated');
  }
  } catch(err) {
    next(err);
  }
};

//DELETE user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idUser } = req.params;
    const user = await User.getUserById(Number(idUser));
    const userDeleted = await User.deleteUser(Number(idUser)); //userDeleted = boolean
    if(userDeleted) {
      res.status(200).send(user); //needed by react-admin
    } else {
      throw new ErrorHandler(500, 'User cannot be deleted');
    }
  } catch(err) {
    next(err);
  }
};

//DELETE bookmark by user
const deleteBookmarkByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { idUser, idArticle } = req.params;
      const bookmarkDeleted = await Bookmark.deleteBookmark(Number(idUser), Number(idArticle)); //boolean
      bookmarkDeleted ? res.sendStatus(204) : res.sendStatus(500);
  } catch(err) {
      next(err);
  }
};

export default { userExists, validateUser, emailIsFree, getAllUsers, getUserById, getArticlesByUser, getPackagesByUser, addUser, addBookmarkByUser, addCommentByUser ,updateUser, deleteUser, deleteBookmarkByUser };
