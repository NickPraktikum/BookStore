"use client";
import Link from "next/link";
import { FunctionComponent } from "react";
import { LinkElement } from "../interfaces/ILinkElementProps";

const LinkElement: FunctionComponent<LinkElement> = ({
  selected,
  text,
  link,
}) => {
  return (
    <Link
      href={link}
      className={`border-b flex flex-row items-center justify-between pb-[10px] px-[6px] ${
        selected ? "border-black" : "border-[#00000080]"
      } hover:w-[99%]`}
    >
      <p className={selected ? "text-black" : "text-[#00000080]"}>{text}</p>
      <div>
        {selected ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.45496 9.95999L7.71496 6.69999C8.09996 6.31499 8.09996 5.68499 7.71496 5.29999L4.45496 2.03999"
              stroke="black"
              strokeOpacity="0.7"
              strokeWidth="1.5"
            />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.45496 9.95999L7.71496 6.69999C8.09996 6.31499 8.09996 5.68499 7.71496 5.29999L4.45496 2.03999"
              stroke="black"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </div>
    </Link>
  );
};
export default LinkElement;
