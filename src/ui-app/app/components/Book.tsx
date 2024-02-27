import { FunctionComponent } from "react";

const Book: FunctionComponent<{ book: IBookModel }> = ({ book }) => {
  return (
    <div className="w-[277px] h-[327px] bg-white rounded-xl flex justify-center items-center flex-col">
      <div className="mb-[10px]">
        <h3 className="mb-[4px] text-[#181818] font-medium text-lg">Book</h3>
        <p className="text-[#666666] font-normal text-sm">{book.title}</p>
      </div>
      <div className="flex justify-around items-center flex-column flex-wrap p-4 text-[#666666] font-normal text-sm">
        <div className="flex justify-center items-center w-[50%] text-center border-r-2 py-3">
          <p>Id: {book.id}</p>
        </div>
        <div className="flex justify-center items-center w-[50%] text-center py-3">
          <p>ISBN: {book.isbn}</p>
        </div>
        <div className="flex justify-center items-center w-[50%] text-center border-r-2 py-3">
          <p>Version: {book.version}</p>
        </div>
        <div className="flex justify-center items-center w-[50%] text-center  py-3">
          <p>
            Author: <br></br>
            {book.author.name} {book.author.surname}
          </p>
        </div>
        <div className="flex justify-center items-center w-[50%] text-center py-3">
          <p>IsDeleted: {book.isDeleted.toString()}</p>
        </div>
      </div>
    </div>
  );
};
export default Book;
