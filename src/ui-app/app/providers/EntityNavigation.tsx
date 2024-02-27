"use client";
import { useStoreActions, useStoreState } from "@/app/store/Store";
import Entities from "../components/Entities";

export default function EntityNavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const selection = useStoreState((state) => state.entitySelection);
  const setEntitySelection = useStoreActions(
    (actions) => actions.setEntitySelection
  );
  return (
    <section className="flex justify-center items-center flex-col mt-5">
      <div className="bg-[#0C2D57] w-[623px] h-[100px] flex justify-around items-center rounded-[19px] mb-12">
        <div className="w-[100%] h-[100%] bg-[#4D9BFF] flex items-center justify-between pl-8 rounded-s-[19px]">
          <label htmlFor="#books" className="text-white font-semibold text-lg">
            Books
          </label>
          <input
            type="radio"
            id="books"
            className="appearance-none w-[100px] h-[65px] bg-white checked:bg-[#FF8585] checked:border-black rounded-s-2xl transition-colors duration-400"
            name="entitySelection"
            checked={selection == "books"}
            onChange={() => {
              setEntitySelection("books");
            }}
          />
        </div>
        <div className="w-[100%] h-[100%] bg-[#0C2D57] flex items-center justify-between pr-8 rounded-e-[19px]">
          <input
            type="radio"
            id="authors"
            className="appearance-none w-[100px] h-[65px] bg-white checked:bg-[#FF8585] checked:border-black rounded-e-2xl transition-colors duration-400"
            name="entitySelection"
            checked={selection == "authors"}
            onChange={() => setEntitySelection("authors")}
          />
          <label
            htmlFor="#authors"
            className="text-white font-semibold text-lg"
          >
            Authors
          </label>
        </div>
      </div>
      {children}
    </section>
  );
}
