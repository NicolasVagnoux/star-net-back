import { RowDataPacket } from 'mysql2';

export default interface IArticle extends RowDataPacket {
    id: number;
    title: string;
    idUser: number;
    mainImage: string;
    mainContent: string;
    creationDate: Date;
    lastUpdateDate: Date;
}