"use client";

import { FunctionComponent } from "react";
import { IScrollBar } from "../interfaces/IScrollBar";

const ScrollBar: FunctionComponent<IScrollBar> = ({ text }) => {
  const scrollLeft = () => {
    document.getElementById("slider")!.scrollBy({
      left: -100,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    document.getElementById("slider")!.scrollBy({
      left: 100,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex justify-between items-center px-[30px] mb-[24px]">
      <h6 className="font-bold text-sm">{text}</h6>
      <div className="flex flex-row gap-[14px]">
        <button
          className="bg-[#EBF1E6] w-[18px] h-[18px] rounded-full flex justify-center items-center"
          onClick={scrollLeft}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.03003 1.36L2.8567 3.53333C2.60003 3.79 2.60003 4.21 2.8567 4.46667L5.03003 6.64"
              stroke="black"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="bg-[#EBF1E6] w-[18px] h-[18px] rounded-full flex justify-center items-center"
          onClick={scrollRight}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.96997 6.64L5.1433 4.46667C5.39997 4.21 5.39997 3.79 5.1433 3.53333L2.96997 1.36"
              stroke="black"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ScrollBar;
