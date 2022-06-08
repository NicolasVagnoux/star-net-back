import { Express } from 'express';
import articlesController from './controllers/articles';
import usersController from './controllers/users';

const setupRoutes = (server: Express) => {
  ///// USERS /////

  // GET user by id
  server.get(
    '/api/users/:idUser',
    usersController.userExists,
    usersController.getUserById
  );

  ///// ARTICLES /////

  // GET articles
  server.get('/api/articles', articlesController.getAllArticles);

  // GET article by id
  server.get('/api/articles/:idArticle', articlesController.getOneArticle);

  // GET articles by user (bookmark)
  server.get(
    '/api/users/:idUser/articles',
    usersController.userExists,
    usersController.getArticlesByUser
  );
};

export default setupRoutes;
