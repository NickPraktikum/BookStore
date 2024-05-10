// The error block.
"use client";
import { FunctionComponent } from "react";
import { IError } from "../interfaces/IError";

const ErrorBlock: FunctionComponent<IError> = ({ errorMessage }) => {
  return (
    <div className="flex justify-center items-center">
      {errorMessage.includes("Not Found") ? (
        <div className="bg-[#ECECEC] w-[300px] h-[180px] p-5 text-center rounded-xl flex justify-center items-center flex-col overflow-hidden drop-shadow-md shadow-md">
          <h2 className="oxygen-mono-regular text-5xl">404 Error</h2>
          <p className="text-base">No instances were found!</p>
          <button
            className="bg-white p-2 rounded-lg m-2 text-sm"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </button>
        </div>
      ) : (
        <div className="bg-[#ECECEC] w-[300px] h-[180px] p-5 text-center rounded-xl flex justify-center items-center flex-col overflow-hidden drop-shadow-md shadow-md">
          <h2 className="oxygen-mono-regular text-5xl">Unknown Error!</h2>
          <p className="text-base">{errorMessage}</p>
          <button
            className="bg-white p-2 rounded-lg m-2 text-sm"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </button>
        </div>
      )}
    </div>
  );
};
export default ErrorBlock;
