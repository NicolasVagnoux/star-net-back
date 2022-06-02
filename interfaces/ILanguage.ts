import { RowDataPacket } from 'mysql2';

export default interface ILanguage extends RowDataPacket {
    id: number;
    name: string;
}