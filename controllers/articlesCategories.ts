import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import ArticleCategory from '../models/articleCategory';
import IArticleCategory from '../interfaces/IArticleCategory';

// ! ONLY FOR REACT ADMIN ! //

// GET all ArtCat
const getAllArtCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artCats = await ArticleCategory.getAllArtCat();

      // react-admin
    res.setHeader(
      'Content-Range',
      `artCats : 0-${artCats.length}/${artCats.length + 1}`
    );

      return res.status(200).json(artCats);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // GET ArtCat by id
const getOneArtCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idArtCat } = req.params;
      const artCat = await ArticleCategory.getArtCatById(Number(idArtCat));
      artCat ? res.status(200).json(artCat) : res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // POST Artcat
  const addArtCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artCat = req.body as IArticleCategory;
      artCat.id = await ArticleCategory.addArtCat(artCat);
      res.status(201).json(artCat);
    } catch(err) {
      console.log(err)
      next(err);
    }
  }) as RequestHandler;

  // PUT ArtCat
  const updateArtCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idArtCat } = req.params;
      const artCatUpdated = await ArticleCategory.updateArtCat(Number(idArtCat), req.body as IArticleCategory); // => boolean
      if (artCatUpdated) {
        const artCat = await ArticleCategory.getArtCatById(Number(idArtCat));
        res.status(200).send(artCat); // react-admin needs this response
      } else {
          throw new ErrorHandler(500, 'ArticleCategory cannot be updated');
      }
    } catch(err) {
      next(err);
    }
  }) as RequestHandler;

  // DELETE artCat
  const deleteArtCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idArtCat } = req.params;
      const artCat = await ArticleCategory.getArtCatById(Number(idArtCat));
      const artCatDeleted = await ArticleCategory.deleteArtCat(Number(idArtCat)); // => boolean
      if(artCatDeleted) {
        res.status(200).send(artCat); //needed by react-admin
      } else {
        throw new ErrorHandler(500, 'ArticleCategory cannot be deleted');
      }
    } catch(err) {
      next(err);
    }
  }) as RequestHandler;

  export default { getAllArtCat, getOneArtCat, addArtCat, updateArtCat, deleteArtCat };