"use client";
import { FunctionComponent } from "react";
import Book from "./Book";
import { IBooksElement } from "../../interfaces/IBooksElement";
import ScrollBar from "../ScrollBar";
import { IBookModel } from "../../interfaces/IBookModel";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../ErrorBlock";
import { FetchDeletedBooks } from "../../functions/FetchDeletedBooks";
import LoadingBlock from "../LoadingBlock";

const DeletedBooks: FunctionComponent<IBooksElement> = ({ text }) => {
  const { data, error, isError, isLoading } = useQuery<IBookModel[], Error>({
    queryKey: ["deleted-books"],
    queryFn: FetchDeletedBooks,
    refetchInterval: 180000,
  });
  return (
    <>
      {isError ? (
        <ErrorBlock errorMessage={error.message} />
      ) : isLoading ? (
        <LoadingBlock />
      ) : (
        <div>
          <ScrollBar text={text} />
          <div
            id="slider"
            className="flex gap-3 whitespace-nowrap overflow-x-auto overflow-y-hidden flex-shrink-0 flex-grow-0 flex-basis-auto scrolling-wrapper mx-[25px] pb-5"
          >
            {data?.map((v: IBookModel, index: number) => (
              <Book
                key={index}
                id={v.id}
                isbn={v.isbn}
                title={v.title}
                version={v.version}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default DeletedBooks;
