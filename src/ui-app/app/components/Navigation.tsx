import { FunctionComponent } from "react";
import LinkElement from "./LinkElement";

const Navigation: FunctionComponent = () => {
  return (
    <div className="w-[220px] bg-[#EBF1E6] flex justify-center items-center">
      <ul className="flex flex-col gap-5 w-[184px] font-semibold text-sm">
        <li>
          <LinkElement selected={false} text="Available books" link={"/"} />
        </li>
        <li>
          <LinkElement
            selected={true}
            text="Deleted books"
            link="/deleted-books"
          />
        </li>
        <li>
          <LinkElement
            selected={false}
            text="Available authors"
            link="/available-authors"
          />
        </li>
        <li>
          <LinkElement
            selected={false}
            text="Deleted authors"
            link="/deleted-authors"
          />
        </li>
        <li>
          <LinkElement selected={false} text="Book by id" link="/book-by-id" />
        </li>
        <li>
          <LinkElement
            selected={false}
            text="Author by id"
            link="/author-by-id"
          />
        </li>
        <li>
          <LinkElement
            selected={false}
            text="Book by version"
            link="/book-by-version"
          />
        </li>
        <li>
          <LinkElement
            selected={false}
            text="Author by version"
            link="/author-by-version"
          />
        </li>
      </ul>
    </div>
  );
};
export default Navigation;
