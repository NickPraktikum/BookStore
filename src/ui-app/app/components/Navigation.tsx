"use client";
import { FunctionComponent } from "react";
import LinkElement from "./LinkElement";
import { usePathname } from "next/navigation";

const Navigation: FunctionComponent = () => {
  const pathname = usePathname();
  return (
    <div className="w-[220px] bg-[#EBF1E6] flex justify-center items-center">
      <ul className="flex flex-col gap-5 w-[184px] font-semibold text-sm">
        <li>
          <LinkElement
            selected={pathname === "/"}
            text="Available books"
            link="/"
          />
        </li>
        <li>
          <LinkElement
            selected={pathname === "/deleted-books"}
            text="Deleted books"
            link="/deleted-books"
          />
        </li>
        <li>
          <LinkElement
            selected={pathname === "/available-authors"}
            text="Available authors"
            link="/available-authors"
          />
        </li>
        <li>
          <LinkElement
            selected={pathname === "/deleted-authors"}
            text="Deleted authors"
            link="/deleted-authors"
          />
        </li>
        <li>
          <LinkElement
            selected={pathname === "/book-by-id"}
            text="Book by id"
            link="/book-by-id"
          />
        </li>
        <li>
          <LinkElement
            selected={pathname === "/author-by-id"}
            text="Author by id"
            link="/author-by-id"
          />
        </li>
        <li>
          <LinkElement
            selected={
              pathname === "/book-by-version" ||
              pathname.includes("/book-by-version")
            }
            text="Book by version"
            link="/book-by-version"
          />
        </li>
        <li>
          <LinkElement
            selected={
              pathname === "/author-by-version" ||
              pathname.includes("/author-by-version")
            }
            text="Author by version"
            link="/author-by-version"
          />
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
