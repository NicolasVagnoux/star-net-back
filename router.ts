import { Express } from 'express';
import articlesController from './controllers/articles';
import usersController from './controllers/users';
import packagesController from './controllers/packages';
import authController from './controllers/auth';
import categoriesController from './controllers/categories';

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
  // POST user
  server.post(
    '/api/users',
    usersController.validateUser,
    usersController.emailIsFree,
    usersController.addUser
  );
  // POST bookmark by user
  server.post(
    '/api/users/:idUser/bookmarks',
    authController.getCurrentSession,
    usersController.addBookmarkByUser
  );

  // POST comments by user
  server.post(
    '/api/users/:idUser/comments',
    authController.getCurrentSession,
    usersController.addCommentByUser
  );

  // PUT user
  server.put(
    '/api/users/:idUser',
    usersController.validateUser,
    usersController.userExists,
    usersController.updateUser
  );
  // DELETE user
  server.delete(
    '/api/users/:idUser',
    usersController.userExists,
    usersController.deleteUser
  );
  // DELETE bookmark by user
  server.delete(
    '/api/users/:idUser/bookmarks/:idArticle',
    authController.getCurrentSession,
    usersController.deleteBookmarkByUser
  );
  // GET bookmark by user and article
  server.get(
    '/api/users/:idUser/bookmarks/:idArticle',
    authController.getCurrentSession,
    usersController.getBookmarkByUserAndArticle
  );

  ///// LOGIN /////
  server.post('/api/login', authController.validateLogin, authController.login);

  ///// ARTICLES /////
  // GET articles
  server.get('/api/articles', articlesController.getAllArticles);
  // GET article by id
  server.get(
    '/api/articles/:idArticle',
    authController.getCurrentSession,
    articlesController.getOneArticle
  );
  // GET articles by user (bookmarks)
  server.get(
    '/api/users/:idUser/articles',
    usersController.userExists,
    authController.getCurrentSession,
    usersController.getArticlesByUser
  );
  //GET articles by package (articlesPackages)
  server.get(
    '/api/packages/:idPackage/articles',
    packagesController.getArticlesByPackage
  );
  //GET completedArticles by user and packages
  server.get(
    '/api/users/:idUser/packages/:idPackage/completedArticles',
    usersController.userExists,
    authController.getCurrentSession,
    packagesController.packageExists,
    packagesController.getCompletedArticlesByUserAndPackage
  );

  //GET completedArticles by user and article
  server.get(
    '/api/users/:idUser/completedArticles/:idArticle',
    authController.getCurrentSession,
    usersController.getCompletedArticlesByUserAndArticle
  );

  // POST completed article by user
  server.post(
    '/api/users/:idUser/completedArticles',
    authController.getCurrentSession,
    usersController.addCompletedArticleByUser
  );

  //POST article
  server.post(
    '/api/articles',
    articlesController.validateArticle,
    articlesController.addArticle
  );
  //PUT article
  server.put(
    '/api/articles/:idArticle',
    articlesController.validateArticle,
    articlesController.articleExists,
    articlesController.updateArticle
  );
  //DELETE article
  server.delete(
    '/api/articles/:idArticle',
    articlesController.articleExists,
    articlesController.deleteArticle
  );

  // POST completed article by user
  server.post(
    '/api/users/:idUser/completedArticles',
    authController.getCurrentSession,
    usersController.addCompletedArticleByUser
  );

  // DELETE completedArticles by user
  server.delete(
    '/api/users/:idUser/completedArticles',
    authController.getCurrentSession,
    usersController.deleteCompletedArticles
  );

  ///// PACKAGES /////
  // GET packages
  server.get(
    '/api/packages',
    // authController.getCurrentSession,
    packagesController.getAllPackages
  );
  // GET followedpackages by User (followedPackages)
  server.get(
    '/api/users/:idUser/followedpackages',
    usersController.userExists,
    usersController.getPackagesByUser
  );

   // POST followedpackages by User (followedPackages)
   server.post(
    '/api/users/:idUser/followedpackages',
    // packagesController.packageExists,
    packagesController.packageIsNotFollowedByUser,
    usersController.addFollowedPackagesByUser
  );

  // POST article by package
  server.post(
    '/api/packages/:idPackage/articles',
    packagesController.packageExists,
    packagesController.articlePackageExists,
    packagesController.addArticleByPackage
  );

  ///// CATEGORIES /////
  // GET all categories
  server.get('/api/categories', categoriesController.getAllCategories);
  // GET categories by package
  server.get(
    '/api/packages/:idPackage/categories',
    packagesController.getCategoriesByPackage
  );
  // GET categories by article
  server.get(
    '/api/articles/:idArticle/categories',
    articlesController.getCategoriesByArticle
  );
};
export default setupRoutes;
