"use client";
import { FetchBookVersion } from "@/app/functions/FetchBookVersion";
import { useStoreState } from "@/app/store/Store";
import { FunctionComponent, useEffect, useState } from "react";
import Book from "./Book";
import { FetchAuthorVersion } from "../functions/FetchAuthorVersion";
import Author from "./Author";
import ErrorMessage from "./Error";
import Loading from "./Loading";

const EntityForm: FunctionComponent = () => {
  const [id, changeId] = useState<number>(0);
  const [version, changeVersion] = useState<number>(0);
  const entitySelection = useStoreState((state) => state.entitySelection);
  const { data, isLoading, isError, error, refetch, isFetching } =
    entitySelection == "books"
      ? FetchBookVersion(id, version)
      : FetchAuthorVersion(id, version);
  return (
    <div>
      <form className="bg-[#0C2D57] w-[623px] h-[100px] rounded-[19px] flex items-center justify-around">
        <h3 className="font-medium text-base text-white">Entity search: </h3>
        <input
          className="w-[150px] h-[40px] rounded-xl placeholder:text-black p-3 placeholder:font-medium placeholder:text-base text-black font-medium text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          placeholder="Enter entity id:"
          onChange={(e) => {
            changeId(Number(e.target.value));
          }}
        />
        <input
          className="w-[200px] h-[40px] rounded-xl placeholder:text-black p-3 placeholder:font-medium placeholder:text-base text-black font-medium text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          placeholder="Enter entity version:"
          onChange={(e) => changeVersion(Number(e.target.value))}
        />
        <button
          className="bg-white rounded-2xl w-[80px] h-[40px] font-medium text-base"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            refetch();
          }}
        >
          Search
        </button>
      </form>
      <div className="mt-10 flex justify-center items-center">
        {data != null && !isFetching && !isError ? (
          entitySelection == "books" ? (
            <Book book={data as IBookModel} />
          ) : (
            <Author author={data as IAuthorModel} />
          )
        ) : null}
        {isFetching ? <Loading /> : null}
        {isError && !isFetching ? (
          <ErrorMessage message={error.message} />
        ) : null}
      </div>
    </div>
  );
};
export default EntityForm;
