import { NextFunction, Request, Response } from 'express';
import Bookmark from '../models/bookmark';
import IBookmark from '../interfaces/IBookmark';

//POST bookmark
const addBookmark = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookmark = req.body as IBookmark;
        bookmark.id = await Bookmark.addBookmark(bookmark);
        res.status(201).json(bookmark);
    } catch(err) {
        next(err);
    }
};

//DELETE bookmark
const deleteBookmark = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idBookmark } = req.params;
        const bookmarkDeleted = await Bookmark.deleteBookmark(Number(idBookmark)); //boolean
        bookmarkDeleted ? res.sendStatus(204) : res.sendStatus(500);
    } catch(err) {
        next(err);
    }
};

export default { addBookmark, deleteBookmark };