/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-plus-operands */
import { Request, RequestHandler, Response } from 'express';
const nodemailer = require("nodemailer");

interface IContactMail {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const sendMail = (async (req: Request, res: Response) : Promise<void> => {
    const { name, email, subject, message } = req.body as IContactMail;
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PWD_MAIL,
      },
    });
  
    const mailOptions = {
      from: "ContactForm",
      sender: "star-net@outlook.fr",
      to: "star-net@outlook.fr",
      subject: "Message reçu via le formulaire de contact StarNet",
      text: `Vous avez reçu un mail de : ${email} !
        Nom : ${name}
        Sujet : ${subject}
        Message : ${message}`,
    };
  
    await transporter.sendMail(mailOptions, function (error: object, info: any) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        console.log("Email sent: " + info.response);
        res.sendStatus(200);
      }
    });
  }) as RequestHandler;

  export default { sendMail };