import { RowDataPacket } from 'mysql2';

export default interface IPackage extends RowDataPacket {
    id: number;
    name: string;
    description: string;
}