"use client";
import { FunctionComponent } from "react";
import { IError } from "../interfaces/IError";
import Link from "next/link";
import { IErrorSingle } from "../interfaces/IErrorSingle";

const ErrorBlockSingle: FunctionComponent<IErrorSingle> = ({
  errorMessage,
  isBook,
  isVersion,
}) => {
  return (
    <div className="flex justify-center items-center">
      {errorMessage.includes("Not Found") ? (
        <div className="bg-[#ECECEC] w-[300px] h-[180px] p-5 text-center rounded-xl flex justify-center items-center flex-col overflow-hidden drop-shadow-md shadow-md">
          <h2 className="oxygen-mono-regular text-5xl">404 Error</h2>
          <p className="text-base">No instances were found!</p>
          <Link
            href={
              isBook && isVersion
                ? "/book-by-version"
                : !isBook && isVersion
                ? "/author-by-version"
                : isBook && !isVersion
                ? "/book-by-id"
                : "/author-by-id"
            }
          >
            <button className="bg-white p-2 rounded-lg m-2 text-sm">
              Reload
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-[#ECECEC] w-[300px] h-[180px] p-5 text-center rounded-xl flex justify-center items-center flex-col overflow-hidden drop-shadow-md shadow-md">
          <h2 className="oxygen-mono-regular text-5xl">Unknown Error!</h2>
          <p className="text-base">{errorMessage}</p>
          <Link
            href={
              isBook && isVersion
                ? "/book-by-version"
                : !isBook && isVersion
                ? "/author-by-version"
                : isBook && !isVersion
                ? "/book-by-id"
                : "/author-by-id"
            }
          >
            <button className="bg-white p-2 rounded-lg m-2 text-sm">
              Go Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default ErrorBlockSingle;
