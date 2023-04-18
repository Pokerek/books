export declare interface BookAttributes {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  available?: boolean;
  userId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export declare type BookUpdateAttributes = Pick<
  BookAttributes,
  'title' | 'author' | 'isbn'
>;
