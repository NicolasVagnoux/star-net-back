import { RowDataPacket } from 'mysql2';

export default interface Ibadge extends RowDataPacket {
  id: number;
  name: string;
  imageUrl: string;
}
