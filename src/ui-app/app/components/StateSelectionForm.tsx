"use client";
import { useStoreActions, useStoreState } from "../store/Store";

const StateSelectionForm = () => {
  const selectionState = useStoreState((state) => state.entityState);
  const setEntitySelection = useStoreActions(
    (actions) => actions.setEntityState
  );
  return (
    <div className="bg-[#0C2D57] w-[623px] h-[100px] flex justify-around items-center rounded-[19px]">
      <div className="w-[100%] h-[100%] bg-[#4D9BFF] flex items-center justify-between pl-8 rounded-s-[19px]">
        <label
          htmlFor="#available"
          className="text-white font-semibold text-lg"
        >
          Available
        </label>
        <input
          type="radio"
          id="available"
          className="appearance-none w-[100px] h-[65px] bg-white checked:bg-[#FF8585] checked:border-black rounded-s-2xl transition-colors duration-400"
          name="entityState"
          checked={selectionState == "available"}
          onChange={() => {
            setEntitySelection("available");
          }}
        />
      </div>
      <div className="w-[100%] h-[100%] bg-[#0C2D57] flex items-center justify-between pr-8 rounded-e-[19px]">
        <input
          type="radio"
          id="deleted"
          className="appearance-none w-[100px] h-[65px] bg-white checked:bg-[#FF8585] checked:border-black rounded-e-2xl transition-colors duration-400"
          name="entityState"
          checked={selectionState == "deleted"}
          onChange={() => setEntitySelection("deleted")}
        />
        <label htmlFor="#deleted" className="text-white font-semibold text-lg">
          Deleted
        </label>
      </div>
    </div>
  );
};
export default StateSelectionForm;
