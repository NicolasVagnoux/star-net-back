import { RowDataPacket } from 'mysql2';

export default interface IRight extends RowDataPacket {
    id: number;
    level: string;
}