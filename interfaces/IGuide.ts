import { RowDataPacket } from 'mysql2';

export default interface IGuide extends RowDataPacket {
    id: number;
    title: string;
    mainPicture: string;
    description: string;
    orderNumber: number;
}