// import { NextFunction, Request, RequestHandler, Response } from 'express';
import argon2 from 'argon2';

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

export default { hashPassword, verifyPassword };