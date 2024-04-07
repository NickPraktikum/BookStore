import { FunctionComponent } from "react";
import { IAuthorsElement } from "../interfaces/IAuthorsElement";
import Author from "./Author";

const Authors: FunctionComponent<IAuthorsElement> = ({ authors }) => {
  return (
    <div className="flex gap-3 whitespace-nowrap overflow-x-auto overflow-y-hidden flex-shrink-0 flex-grow-0 flex-basis-auto scrolling-wrapper mx-[20px] pb-5">
      {authors?.map((v: IAuthorModel, index: number) => (
        <Author
          id={v.id}
          name={v.name}
          surname={v.surname}
          age={v.age}
          birthDate={v.birthDate}
          isDeleted={v.isDeleted}
          deletedAt={v.deletedAt}
          books={v.books}
          version={v.version}
          key={index}
        />
      ))}
    </div>
  );
};
export default Authors;
