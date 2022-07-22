import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Guide from '../models/guide';
import IGuide from '../interfaces/IGuide';

// GET all guides
const getAllGuides = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guides = await Guide.getAllGuides();

      // react-admin
      res.setHeader(
      'Content-Range',
      `guides : 0-${guides.length}/${guides.length + 1}`
      );

      return res.status(200).json(guides);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // GET guide by id
const getOneGuide = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idGuide } = req.params;
      const guide = await Guide.getGuideById(Number(idGuide));
      guide ? res.status(200).json(guide) : res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // POST guide
  const addGuide = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newGuide = req.body as IGuide;
      newGuide.id = await Guide.addGuide(newGuide);
      res.status(201).json(newGuide);
    } catch(err) {
      console.log(err)
      next(err);
    }
  }) as RequestHandler;

  // PUT guide
  const updateGuide = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idGuide } = req.params;
      const guideUpdated = await Guide.updateGuide(Number(idGuide), req.body as IGuide); //articleUpdated => boolean
      if (guideUpdated) {
        const guide = await Guide.getGuideById(Number(idGuide));
        res.status(200).send(guide); // react-admin needs this response
      } else {
          throw new ErrorHandler(500, 'Guide cannot be updated');
      }
    } catch(err) {
      next(err);
    }
  }) as RequestHandler;

  // DELETE guide
  const deleteGuide = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idGuide } = req.params;
      const guide = await Guide.getGuideById(Number(idGuide));
      const guideDeleted = await Guide.deleteGuide(Number(idGuide)); // guideDelected => boolean
      if(guideDeleted) {
        res.status(200).send(guide); //needed by react-admin
      } else {
        throw new ErrorHandler(500, 'Slide cannot be deleted');
      }
    } catch(err) {
      next(err);
    }
  }) as RequestHandler;

  export default { getAllGuides, getOneGuide, addGuide, updateGuide, deleteGuide };