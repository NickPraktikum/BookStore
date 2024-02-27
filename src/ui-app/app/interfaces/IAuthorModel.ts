interface IAuthorModel {
  id: number;
  name: string;
  surname: string;
  age: number;
  birthDate: string;
  isDeleted: boolean;
  deletedAt: string;
  books: IBookModel[];
  version: number;
}
