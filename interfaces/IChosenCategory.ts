import { RowDataPacket } from 'mysql2';

export default interface IChosenCategory extends RowDataPacket {
    id: number;
    idUser: number;
    idCategory: number;
}