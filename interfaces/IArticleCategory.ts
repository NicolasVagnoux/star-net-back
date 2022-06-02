import { RowDataPacket } from 'mysql2';

export default interface IArticleCategory extends RowDataPacket {
    id: number;
    idArticle: number;
    idCategory: number;
}