// The block to display a single author
import { FunctionComponent } from "react";

const Author: FunctionComponent<IAuthorModel> = ({
  id,
  name,
  surname,
  version,
}) => {
  return (
    <div
      className="flex justify-center items-center flex-col w-[81px] h-[104px] bg-[#FDF397] border border-black rounded-lg drop-shadow-md 
 source-code-pro flex-shrink-0 flex-grow-0 flex-basis-auto"
    >
      <h6 className="font-medium text-[12px] mb-[4px] text-[#181818] ">
        {surname}
      </h6>
      <div className="font-normal text-[9px] flex items-center flex-col gap-[2px] text-[#666666] text-wrap text-center  p-[0.5px]">
        <p>Id: {id}</p>
        <p>Name: {name}</p>
        <p>Surname: {surname}</p>
        <p>Version: {version}</p>
      </div>
    </div>
  );
};
export default Author;
