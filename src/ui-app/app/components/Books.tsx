"use client";
import { FetchAuthorVersion } from "@/app/functions/FetchAuthorVersion";
import { FetchAvailableAuthors } from "@/app/functions/FetchAvailableAuthors";
import { FetchAvailableBooks } from "@/app/functions/FetchAvailableBooks";
import Book from "./Book";
import { FunctionComponent } from "react";
import { FetchDeletedBooks } from "../functions/FetchDeletedBooks";
import Loading from "./Loading";
import ErrorMessage from "./Error";
const Books: FunctionComponent<{ state: EntityStates }> = ({ state }) => {
  const { data, isLoading, isError, error, isFetching } =
    state == "available" ? FetchAvailableBooks() : FetchDeletedBooks();
  return (
    <div className="flex justify-around gap-[69px] flex-wrap py-[50px]">
      {data != null && !isFetching && !isError
        ? data.map((book: IBookModel, index: number) => {
            return <Book book={book} key={index} />;
          })
        : null}
      {isFetching ? <Loading /> : null}
      {isError && !isFetching ? <ErrorMessage message={error.message} /> : null}
    </div>
  );
};
export default Books;
