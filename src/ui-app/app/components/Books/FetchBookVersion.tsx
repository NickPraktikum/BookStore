"use client";
import { FunctionComponent } from "react";
import { IBookModel } from "../../interfaces/IBookModel";
import { useQuery } from "@tanstack/react-query";
import { IFetchBook } from "../../interfaces/IFetchBook";
import ErrorBlock from "../ErrorBlock";
import Book from "./Book";
import { FetchBookVersion } from "../../functions/FetchBookVersion";
import { IFetchBookVersion } from "../../interfaces/IFetchBookVersion";
import ErrorBlockSingle from "../ErrorBlockSingle";
import LoadingBlock from "../LoadingBlock";

const FetchBookVersionBlock: FunctionComponent<IFetchBookVersion> = ({
  bookId,
  version,
}) => {
  const { data, error, isError, isLoading } = useQuery<IBookModel, Error>({
    queryKey: ["books-version", bookId],
    queryFn: () => FetchBookVersion(bookId, version),
    refetchInterval: 180000,
  });
  return (
    <>
      {isError ? (
        <ErrorBlockSingle
          errorMessage={error.message}
          isBook={true}
          isVersion={true}
        />
      ) : isLoading ? (
        <LoadingBlock />
      ) : (
        <Book
          id={data?.id as number}
          isbn={data?.isbn as string}
          title={data?.title as string}
          version={data?.version as number}
        />
      )}
    </>
  );
};

export default FetchBookVersionBlock;
