import { Express } from 'express';
import articlesController from './controllers/articles';

const setupRoutes = (server: Express) => {
  /////ARTICLES

  //   get articles
  server.get('/api/articles', articlesController.getAllArticles);

  //   get article by id
  server.get('/api/articles/:idArticle', articlesController.getOneArticle);
};

export default setupRoutes;
