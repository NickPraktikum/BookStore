"use client";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { ISearchFormMode } from "../interfaces/ISearchFormMode";

const SearchFormVersionBlocks: FunctionComponent<ISearchFormMode> = ({
  mode,
}) => {
  const [entity, changeEntity] = useState<string>("");
  const [version, changeVersion] = useState<string>("");
  return (
    <div className="px-[15px]  flex-col pb-[50px] pt-[30px]">
      <h3 className="font-bold text-[20px] pb-[15px]">
        {mode == "author" ? "Author" : "Book"} by version
      </h3>
      <div className="flex justify-between items-center flex-row gap-[11px]">
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
            placeholder="Find a book"
            className="w-[90px] h-[39px] bg-[#ECECEC] placeholder:text-black placeholder:font-medium placeholder:text-sm focus:outline-none rounded-lg border-none pr-2"
            onChange={(e) => changeEntity(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Enter the version"
          className="w-[125px] h-[39px] bg-[#ECECEC] placeholder:text-black placeholder:font-medium placeholder:text-sm focus:outline-none rounded-lg border-none drop-shadow-md shadow-md px-2"
          onChange={(e) => changeVersion(e.target.value)}
        />
        <Link
          href={
            mode == "author"
              ? `/author-by-version/${entity}/${version}`
              : `/book-by-version/${entity}/${version}`
          }
        >
          <div className="bg-[#ECECEC] w-[93px] h-[39px] rounded-[12px] drop flex items-center flex-row drop-shadow-md shadow-md px-[15px] gap-[7.5px] hover:gap-[10px]">
            <p className="text-black font-medium text-sm">Search</p>
            <div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.67383 17.3809H14.3174C16.2246 17.3809 17.209 16.3965 17.209 14.5156V3.81934C17.209 1.93848 16.2246 0.954102 14.3174 0.954102H3.67383C1.77539 0.954102 0.782227 1.92969 0.782227 3.81934V14.5156C0.782227 16.3965 1.77539 17.3809 3.67383 17.3809ZM13.7461 9.14551C13.7461 9.40918 13.6494 9.61133 13.4385 9.81348L10.3359 12.8633C10.1777 13.0127 10.002 13.0918 9.78223 13.0918C9.34277 13.0918 9.03516 12.7666 9.03516 12.3271C9.03516 12.1074 9.12305 11.9053 9.27246 11.7646L10.3799 10.71L11.3994 9.89258L9.52734 9.98047H5.08887C4.62305 9.98047 4.28906 9.62891 4.28906 9.1543C4.28906 8.6709 4.62305 8.31934 5.08887 8.31934H9.52734L11.3994 8.40723L10.3711 7.58984L9.27246 6.53516C9.13184 6.39453 9.03516 6.19238 9.03516 5.97266C9.03516 5.5332 9.34277 5.2168 9.78223 5.2168C10.002 5.2168 10.1777 5.27832 10.3359 5.43652L13.4385 8.49512C13.6582 8.69727 13.7461 8.89941 13.7461 9.14551Z"
                  fill="#1C1C1E"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default SearchFormVersionBlocks;
