export interface BookAttributes {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
