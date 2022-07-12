import { RowDataPacket } from 'mysql2';

export default interface IFaq extends RowDataPacket {
    id: number;
    question: string;
    answer: string;
    orderNumber: number;
}