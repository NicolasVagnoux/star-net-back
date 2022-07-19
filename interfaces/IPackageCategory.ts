import { RowDataPacket } from 'mysql2';

export default interface IPackageCategory extends RowDataPacket {
    id: number;
    idPackage: number;
    idCategory: number;
}