import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Article from '../models/article';
import User from '../models/user';
import Package from '../models/package';
import Joi from 'joi';
import IUser from '../interfaces/IUser';

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

export default { userExists, validateUser, emailIsFree, getAllUsers, getUserById, getArticlesByUser, getPackagesByUser, addUser, deleteUser };
