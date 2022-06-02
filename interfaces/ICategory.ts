import { RowDataPacket } from 'mysql2';

export default interface ICategory extends RowDataPacket {
    id: number;
    name: string;
    description: string;
}