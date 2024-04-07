"use client";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { ISearchFormMode } from "../interfaces/ISearchFormMode";

const SearchForm: FunctionComponent<ISearchFormMode> = ({ mode }) => {
  const [entity, changeEntity] = useState<string>("");
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-center items-center flex-col pt-[30px] gap-5">
        <h3 className="font-bold text-[20px]">
          {mode == "author" ? "Author" : "Book"} by id
        </h3>
        <div className="flex justify-between items-center gap-[8px] bg-[#ECECEC] rounded-lg drop-shadow-md shadow-md">
          <svg
            className="h-[39px] ml-[13px]"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.14579 14.875C11.8622 14.875 14.875 11.8623 14.875 8.14584C14.875 4.42942 11.8622 1.41667 8.14579 1.41667C4.42938 1.41667 1.41663 4.42942 1.41663 8.14584C1.41663 11.8623 4.42938 14.875 8.14579 14.875Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.5833 15.5833L14.1666 14.1667"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder={`Find ${mode == "author" ? "an author" : "a book"}`}
            className="w-[186px] h-[39px] bg-[#ECECEC] placeholder:text-black placeholder:font-medium focus:outline-none rounded-lg border-none"
            onChange={(e) => changeEntity(e.target.value)}
          />
        </div>
        <Link
          href={
            mode == "author"
              ? `/author-by-id/${entity}`
              : `/book-by-id/${entity}`
          }
        >
          <button className="p-3 bg-[#ECECEC] rounded-xl text-black font-medium drop-shadow-md shadow-md">
            Search
          </button>
        </Link>
      </div>
    </main>
  );
};
export default SearchForm;
