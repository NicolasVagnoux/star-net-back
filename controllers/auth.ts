import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../helpers/errors';
import User from '../models/user';
import argon2 from 'argon2';
import Joi from 'joi';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';

//Gestion des hash de mots de passe avec argon2
const hashingOptions : object = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1
};
const hashPassword = (plainPassword : string) : Promise<string> => {
    return argon2.hash(plainPassword, hashingOptions);
};
const verifyPassword = (plainPassword : string, hashedPassword : string) : Promise<boolean> => {
    return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};
// ---

//JWT Token calculation and decoding
const calculateToken = (email  = "", id  = 0, idRight  = 1) => {
    return jwt.sign({email, id, idRight}, process.env.PRIVATE_KEY as string);
};

// const decodeToken = (token : string) => {
//     return jwt.decode(token);
// };

//Login validation
const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const errors = Joi.object({
        email: Joi.string().email().max(150).required(),
        password: Joi.string().min(6).max(50).required(),
    }).validate(req.body, { abortEarly: false }).error;
    if (errors) {
        next(new ErrorHandler(422, errors.message));
    } else {
        next();
    }
};

//Login
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as IUser;
        const user = await User.getUserByEmail(email);
        if(!user) {
            throw new ErrorHandler(404, 'This user does not exist');
            // res.status(404).send('This use does not exist');
        } else {
            const passwordIsCorrect : boolean = await verifyPassword(password, (user.hashedPassword));
            if(passwordIsCorrect) {
                const token = calculateToken(email, user.id, user.idRight);
                res.cookie('user_token', token);
                res.status(200).send('Successfully logged in !');
            } else {
                throw new ErrorHandler(401, 'Wrong Password');
            }
        }
    } catch(err) {
        next(err);
    }
};

export default { hashPassword, verifyPassword, validateLogin, login };