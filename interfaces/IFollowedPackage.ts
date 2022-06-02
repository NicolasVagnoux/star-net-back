import { RowDataPacket } from 'mysql2';

export default interface IFollowedPackage extends RowDataPacket {
    id: number;
    idUser: number;
    idPackage: number;
}