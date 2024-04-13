"use client";
import { FunctionComponent } from "react";
import { IBookModel } from "../../interfaces/IBookModel";
import { useQuery } from "@tanstack/react-query";
import { IFetchBook } from "../../interfaces/IFetchBook";
import ErrorBlock from "../ErrorBlock";
import Book from "../Books/Book";
import { FetchBookVersion } from "../../functions/FetchBookVersion";
import { IFetchBookVersion } from "../../interfaces/IFetchBookVersion";
import Author from "./Author";
import { FetchAuthorVersion } from "../../functions/FetchAuthorVersion";
import { IFetchAuthorVersion } from "../../interfaces/IFetchAuthorVersion";
import ErrorBlockSingle from "../ErrorBlockSingle";

const FetchAuthorVersionBlock: FunctionComponent<IFetchAuthorVersion> = ({
  authorId,
  version,
}) => {
  const { data, error, isError } = useQuery<IAuthorModel, Error>({
    queryKey: ["author-version", authorId],
    queryFn: () => FetchAuthorVersion(authorId, version),
    refetchInterval: 180000,
  });
  return (
    <>
      {isError ? (
        <ErrorBlockSingle
          errorMessage={error.message}
          isBook={false}
          isVersion={true}
        />
      ) : (
        <Author
          id={data?.id as number}
          name={data?.name as string}
          surname={data?.surname as string}
          version={data?.version as number}
        />
      )}
    </>
  );
};
export default FetchAuthorVersionBlock;
