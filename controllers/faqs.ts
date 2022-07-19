import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import Faq from '../models/faq';
import IFaq from '../interfaces/IFaq';

// GET all faqs
const getAllFaqs = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const faqs = await Faq.getAllFaqs();

      // react-admin
    res.setHeader(
      'Content-Range',
      `faqs : 0-${faqs.length}/${faqs.length + 1}`
    );

      return res.status(200).json(faqs);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // GET faq by id
const getOneFaq = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idFaq } = req.params;
      const faq = await Faq.getFaqById(Number(idFaq));
      faq ? res.status(200).json(faq) : res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }) as RequestHandler;

  // POST faq
  const addFaq = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newFaq = req.body as IFaq;
      newFaq.id = await Faq.addFaq(newFaq);
      res.status(201).json(newFaq);
    } catch(err) {
      console.log(err)
      next(err);
    }
  }) as RequestHandler;

  // PUT faq
  const updateFaq = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idFaq } = req.params;
      const faqUpdated = await Faq.updateFaq(Number(idFaq), req.body as IFaq); //articleUpdated => boolean
      if (faqUpdated) {
        const faq = await Faq.getFaqById(Number(idFaq));
        res.status(200).send(faq); // react-admin needs this response
      } else {
          throw new ErrorHandler(500, 'Faq cannot be updated');
      }
    } catch(err) {
      next(err);
    }
  }) as RequestHandler;

  // DELETE faq
  const deleteFaq = (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idFaq } = req.params;
      const faq = await Faq.getFaqById(Number(idFaq));
      const faqDeleted = await Faq.deleteFaq(Number(idFaq)); //faqDelected => boolean
      if(faqDeleted) {
        res.status(200).send(faq); //needed by react-admin
      } else {
        throw new ErrorHandler(500, 'Question cannot be deleted');
      }
    } catch(err) {
      next(err);
    }
  }) as RequestHandler;

  export default { getAllFaqs, getOneFaq, addFaq, updateFaq, deleteFaq };