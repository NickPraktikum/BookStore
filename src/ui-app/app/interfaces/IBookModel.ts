interface IBookModel {
  id: number;
  authorId: number;
  isbn: string;
  title: string;
  pages: number;
  isDeleted: boolean;
  price: number;
  description: string;
  deletedAt: string;
  author: IAuthorModel;
  version: number;
}
