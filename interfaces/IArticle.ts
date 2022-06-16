import { RowDataPacket } from 'mysql2';

export default interface IArticle extends RowDataPacket {
    id: number;
    name: string;
    idUser: number;
    mainImage: File; //à vérifier
    mainContent: string;
    creationDate: Date;
    lastUpdateDate: Date;
}