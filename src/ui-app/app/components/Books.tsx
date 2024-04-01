import { FunctionComponent } from "react";
import { FetchAvailableBooks } from "../functions/FetchAvailableBooks";
import Book from "./Book";
import { IBooksElement } from "../interfaces/IBooksElement";

const Books: FunctionComponent<IBooksElement> = ({ books }) => {
  return (
    <div className="flex gap-3 whitespace-nowrap overflow-x-auto overflow-y-hidden flex-shrink-0 flex-grow-0 flex-basis-auto scrolling-wrapper mx-[20px] pb-5">
      {books?.map((v: IBookModel, index: number) => {
        return (
          <Book
            key={index}
            id={v.id}
            ISBN={v.isbn}
            title={v.title}
            version={v.version}
          />
        );
      })}
    </div>
  );
};
export default Books;
