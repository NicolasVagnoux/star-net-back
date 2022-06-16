import { Express } from 'express';
import articlesController from './controllers/articles';
import usersController from './controllers/users';
import packagesController from './controllers/packages';
import authController from './controllers/auth';

const setupRoutes = (server: Express) => {
  ///// USERS /////
  // GET all users
  server.get('/api/users', usersController.getAllUsers);
  // GET user by id
  server.get(
    '/api/users/:idUser',
    usersController.userExists,
    usersController.getUserById
  );
  server.post('/api/users',
  usersController.validateUser,
  usersController.emailIsFree,
  usersController.addUser
  );

  ///// LOGIN /////
  server.post('/api/login',
  authController.validateLogin,
  authController.login
  );

  ///// ARTICLES /////
  // GET articles
  server.get('/api/articles', articlesController.getAllArticles);
  // GET article by id
  server.get('/api/articles/:idArticle', articlesController.getOneArticle);
  // GET articles by user (bookmarks)
  server.get(
    '/api/users/:idUser/articles',
    usersController.userExists,
    usersController.getArticlesByUser
  );
  //GET articles by package (articlesPackages)
  server.get('/api/packages/:idPackage/articles', packagesController.getArticlesByPackage);

  ///// PACKAGES /////
  // GET packages
  server.get('/api/packages', packagesController.getAllPackages);
  // GET packages by User (followedPackages)
  server.get('/api/users/:idUser/packages',
  usersController.userExists,
  usersController.getPackagesByUser);

  ///// CATEGORIES /////
  // GET categories by package
  server.get('/api/packages/:idPackage/categories', packagesController.getCategoriesByPackage)
};

export default setupRoutes;
