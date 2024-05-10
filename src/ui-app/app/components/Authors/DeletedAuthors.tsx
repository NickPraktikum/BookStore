// The block to display all deleted authors.
"use client";
import { FunctionComponent } from "react";
import { IAuthorsElement } from "../../interfaces/IAuthorsElement";
import Author from "./Author";
import ScrollBar from "../ScrollBar";
import { useQuery } from "@tanstack/react-query";
import { FetchAvailableAuthors } from "../../functions/FetchAvailableAuthors";
import ErrorBlock from "../ErrorBlock";
import { FetchDeletedAuthors } from "../../functions/FetchDeletedAuthors";
import LoadingBlock from "../LoadingBlock";

const DeletedAuthors: FunctionComponent<IAuthorsElement> = ({ text }) => {
  const { data, error, isError, isLoading } = useQuery<IAuthorModel[], Error>({
    queryKey: ["deleted-authors"],
    queryFn: FetchDeletedAuthors,
    refetchInterval: 180000,
  });
  return (
    <>
      {isError ? (
        <ErrorBlock errorMessage={error.message} />
      ) : isLoading ? (
        <LoadingBlock />
      ) : (
        <>
          <ScrollBar text={text} />
          <div
            id="slider"
            className="flex gap-3 whitespace-nowrap overflow-x-auto overflow-y-hidden flex-shrink-0 flex-grow-0 flex-basis-auto scrolling-wrapper mx-[25px] pb-5"
          >
            {data?.map((v: IAuthorModel, index: number) => (
              <Author
                id={v.id}
                name={v.name}
                surname={v.surname}
                version={v.version}
                key={index}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default DeletedAuthors;
