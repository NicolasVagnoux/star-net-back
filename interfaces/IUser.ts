import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
    id: number;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    registrationDate: Date; //à vérifier
    userPicture: File; //à vérifier
    password: string;
    hashedPassword: string;
    idTheme: number;
    idLanguage: number;
    idRight: number;
}