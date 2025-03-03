import express from 'express';
import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { handleError } from './helpers/errors';
import setupRoutes from './router';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions: cors.CorsOptions = {
  origin: [
    'http://localhost:3002',
    'http://localhost:3001',
    'http://localhost:3000',
    'https://star-net-front.vercel.app',
    'https://rave-by-starnet.vercel.app',
    'https://starnet-admin.vercel.app',
    'https://starnet-admin-stefankolpacoff.vercel.app',
  ],
  credentials: true,
};

// middleware cors
app.use(cors(corsOptions));

// //middleware perso pour ajouter les headers nécessaires à react-admin
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  next();
});

//middleware pour lire le body
app.use(express.json());
//middleware pour envoyer des cookies
app.use(cookieParser());

setupRoutes(app);

// A mettre à la fin pour gèrer les erreurs qui sortiront des routes
app.use(handleError);

// Pour que nodemailer accepte de se connecter
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 as unknown as string;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
