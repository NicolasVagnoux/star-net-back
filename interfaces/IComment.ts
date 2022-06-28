import { RowDataPacket } from 'mysql2';

export default interface IComment extends RowDataPacket {
    id: number;
    text: string;
    report: boolean;
    rating:number,
    idUser: number;
    idArticle: number;
}