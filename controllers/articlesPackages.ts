import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import ArticlePackage from '../models/articlePackage';
import IArticlePackage from '../interfaces/IArticlePackage';

// ! ONLY FOR REACT ADMIN ! //

// GET all ArtPack
const getAllArtPack = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artPacks = await ArticlePackage.getAllArtPack();

    // react-admin
    res.setHeader(
      'Content-Range',
      `artPacks : 0-${artPacks.length}/${artPacks.length + 1}`
    );

    return res.status(200).json(artPacks);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// GET ArtPack by id
const getOneArtPack = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idArtPack } = req.params;
    const artPack = await ArticlePackage.getArtPackById(Number(idArtPack));
    artPack ? res.status(200).json(artPack) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// POST ArtPack
const addArtPack = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artPack = req.body as IArticlePackage;
    artPack.id = await ArticlePackage.addArtPack(artPack);
    res.status(201).json(artPack);
  } catch (err) {
    console.log(err);
    next(err);
  }
}) as RequestHandler;

// PUT ArtPack
const updateArtPack = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idArtPack } = req.params;
    const artPackUpdated = await ArticlePackage.updateArtPack(
      Number(idArtPack),
      req.body as IArticlePackage
    ); // => boolean
    if (artPackUpdated) {
      const artPack = await ArticlePackage.getArtPackById(Number(idArtPack));
      res.status(200).send(artPack); // react-admin needs this response
    } else {
      throw new ErrorHandler(500, 'ArticlePackage cannot be updated');
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

// DELETE artPack
const deleteArtPack = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idArtPack } = req.params;
    const artPack = await ArticlePackage.getArtPackById(Number(idArtPack));
    const artPackDeleted = await ArticlePackage.deleteArtPack(
      Number(idArtPack)
    ); // => boolean
    if (artPackDeleted) {
      res.status(200).send(artPack); //needed by react-admin
    } else {
      throw new ErrorHandler(500, 'ArticlePackage cannot be deleted');
    }
  } catch (err) {
    next(err);
  }
}) as RequestHandler;

export default {
  getAllArtPack,
  getOneArtPack,
  addArtPack,
  updateArtPack,
  deleteArtPack,
};
