"use client";
import { FunctionComponent } from "react";
import { IBookModel } from "../../interfaces/IBookModel";
import { useQuery } from "@tanstack/react-query";
import { FetchBookById } from "../../functions/FetchBookById";
import { IFetchBook } from "../../interfaces/IFetchBook";
import ErrorBlock from "../ErrorBlock";
import ErrorBlockSingle from "../ErrorBlockSingle";

const FetchBook: FunctionComponent<IFetchBook> = ({ bookId }) => {
  const { data, error, isError } = useQuery<IBookModel, Error>({
    queryKey: ["books", bookId],
    queryFn: () => FetchBookById(bookId),
    refetchInterval: 180000,
  });
  console.log(error?.message);
  return (
    <>
      {isError ? (
        <ErrorBlockSingle
          errorMessage={error.message}
          isBook={true}
          isVersion={false}
        />
      ) : (
        <div
          className="flex justify-center items-center flex-col w-[81px] h-[104px] bg-[#FDF397] border border-black rounded-lg drop-shadow-md 
           source-code-pro flex-shrink-0 flex-grow-0 flex-basis-auto"
        >
          <h6 className="font-medium text-[12px] mb-[4px] text-[#181818] ">
            {data?.title}
          </h6>
          <div className="font-normal text-[9px] flex items-center flex-col gap-[2px] text-[#666666] p-[0.5px]">
            <p>Id: {data?.id}</p>
            <p className="text-wrap text-center">ISBN: {data?.isbn}</p>
            <p>Version: {data?.version}</p>
          </div>
        </div>
      )}
    </>
  );
};
export default FetchBook;
