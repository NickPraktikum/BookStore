// The block to display a single author with react-query.
"use client";
import { FunctionComponent } from "react";
import { IBookModel } from "../../interfaces/IBookModel";
import { useQuery } from "@tanstack/react-query";
import { FetchBookById } from "../../functions/FetchBookById";
import ErrorBlock from "../ErrorBlock";
import { IFetchAuthor } from "../../interfaces/IFetchAuthor";
import { FetchAuthorById } from "../../functions/FetchAuthorById";
import ErrorBlockSingle from "../ErrorBlockSingle";
import LoadingBlock from "../LoadingBlock";

const FetchAuthor: FunctionComponent<IFetchAuthor> = ({ authorId }) => {
  const { data, error, isError, isLoading } = useQuery<IAuthorModel, Error>({
    queryKey: ["authors", authorId],
    queryFn: () => FetchAuthorById(authorId),
    refetchInterval: 180000,
  });

  return (
    <>
      {isError ? (
        <ErrorBlockSingle
          errorMessage={error.message}
          isBook={false}
          isVersion={false}
        />
      ) : isLoading ? (
        <LoadingBlock />
      ) : (
        <div
          className="flex justify-center items-center flex-col w-[81px] h-[104px] bg-[#FDF397] border border-black rounded-lg drop-shadow-md 
   source-code-pro flex-shrink-0 flex-grow-0 flex-basis-auto"
        >
          <h6 className="font-medium text-[12px] mb-[4px] text-[#181818] ">
            {data?.surname}
          </h6>
          <div className="font-normal text-[9px] flex items-center flex-col gap-[2px] text-[#666666] text-wrap text-center  p-[0.5px]">
            <p>Id: {data?.id}</p>
            <p>Name: {data?.name}</p>
            <p>Surname: {data?.surname}</p>
            <p>Version: {data?.version}</p>
          </div>
        </div>
      )}
    </>
  );
};
export default FetchAuthor;
