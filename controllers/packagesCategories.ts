import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import PackageCategory from '../models/packageCategory';
import IPackageCategory from '../interfaces/IPackageCategory';

// ! ONLY FOR REACT ADMIN ! //

// GET all PackCat
const getAllPackCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const packCats = await PackageCategory.getAllPackCat();

      // react-admin
    res.setHeader(
      'Content-Range',
      `packCats : 0-${packCats.length}/${packCats.length + 1}`
    );

      return res.status(200).json(packCats);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // GET PackCat by id
const getOnePackCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idPackCat } = req.params;
      const packCat = await PackageCategory.getPackCatById(Number(idPackCat));
      packCat ? res.status(200).json(packCat) : res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // POST PackCat
  const addPackCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const packCat = req.body as IPackageCategory;
      packCat.id = await PackageCategory.addPackCat(packCat);
      res.status(201).json(packCat);
    } catch(err) {
      console.log(err)
      next(err);
    }
  }) as RequestHandler;

  // PUT PackCat
  const updatePackCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idPackCat } = req.params;
      const packCatUpdated = await PackageCategory.updatePackCat(Number(idPackCat), req.body as IPackageCategory); // => boolean
      if (packCatUpdated) {
        const packCat = await PackageCategory.getPackCatById(Number(idPackCat));
        res.status(200).send(packCat); // react-admin needs this response
      } else {
          throw new ErrorHandler(500, 'PackageCategory cannot be updated');
      }
    } catch(err) {
      next(err);
    }
  }) as RequestHandler;

  // DELETE packCat
  const deletePackCat = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idPackCat } = req.params;
      const packCat = await PackageCategory.getPackCatById(Number(idPackCat));
      const packCatDeleted = await PackageCategory.deletePackCat(Number(idPackCat)); // => boolean
      if(packCatDeleted) {
        res.status(200).send(packCat); //needed by react-admin
      } else {
        throw new ErrorHandler(500, 'PackageCategory cannot be deleted');
      }
    } catch(err) {
      next(err);
    }
  }) as RequestHandler;

  export default { getAllPackCat, getOnePackCat, addPackCat, updatePackCat, deletePackCat };