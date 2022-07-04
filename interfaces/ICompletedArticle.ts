import { RowDataPacket } from 'mysql2';

export default interface ICompletedArticle extends RowDataPacket {
  id: number;
  idUser: number;
  idArticle: number;
  rating: number;
}
