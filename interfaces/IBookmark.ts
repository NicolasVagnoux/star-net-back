import { RowDataPacket } from 'mysql2';

export default interface IBookmark extends RowDataPacket {
    id: number;
    idUser: number;
    idArticle: number;
}