import { RowDataPacket } from 'mysql2';

export default interface IArticlePackage extends RowDataPacket {
    id: number;
    idArticle: number;
    idPackage: number;
}