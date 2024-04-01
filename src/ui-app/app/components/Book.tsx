import { FunctionComponent } from "react";
import { IBookProps } from "../interfaces/IBookProps";

const Book: FunctionComponent<IBookProps> = ({ id, ISBN, title, version }) => {
  return (
    <div
      className="flex justify-center items-center flex-col w-[81px] h-[104px] bg-[#FDF397] border border-black rounded-lg drop-shadow-md 
     source-code-pro flex-shrink-0 flex-grow-0 flex-basis-auto"
    >
      <h6 className="font-medium text-[12px] mb-[4px] text-[#181818] ">
        {title}
      </h6>
      <div className="font-normal text-[9px] flex items-center flex-col gap-[2px] text-[#666666]">
        <p>{id}</p>
        <p>{ISBN}</p>
        <p>{version}</p>
      </div>
    </div>
  );
};
export default Book;
