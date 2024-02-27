"use client";
import { FetchAvailableAuthors } from "@/app/functions/FetchAvailableAuthors";
import { FunctionComponent } from "react";
import Author from "./Author";
import { FetchAvailableBooks } from "../functions/FetchAvailableBooks";
import { FetchDeletedAuthors } from "../functions/FetchDeletedAuthors";
import Loading from "./Loading";
import ErrorMessage from "./Error";

const Authors: FunctionComponent<{ state: EntityStates }> = ({ state }) => {
  const { data, isLoading, isError, error, isFetching } =
    state == "available" ? FetchAvailableAuthors() : FetchDeletedAuthors();
  return (
    <div className="flex justify-around gap-[69px] flex-wrap py-[50px]">
      {data != null && !isFetching && !isError
        ? data.map((author: IAuthorModel, index: number) => {
            return <Author author={author} key={index} />;
          })
        : null}
      {isFetching ? <Loading /> : null}
      {isError && !isFetching ? <ErrorMessage message={error.message} /> : null}
    </div>
  );
};
export default Authors;
