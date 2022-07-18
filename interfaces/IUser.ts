import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    registrationDate: Date; //à vérifier
    userPicture: string;
    password: string;
    hashedPassword: string;
    idTheme: number;
    idLanguage: number;
    isAdmin: number;
}