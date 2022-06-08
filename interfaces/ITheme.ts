import { RowDataPacket } from 'mysql2';

export default interface ITheme extends RowDataPacket {
    id: number;
    name: string;
}

