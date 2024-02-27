import Authors from "@/app/components/Authors";
import Books from "@/app/components/Books";
import Entities from "@/app/components/Entities";
import { FetchAvailableAuthors } from "@/app/functions/FetchAvailableAuthors";
import { FetchAvailableBooks } from "@/app/functions/FetchAvailableBooks";
import { Store, useStoreState } from "@/app/store/Store";
import { StoreProvider } from "easy-peasy";
import React from "react";
import StateSelectionForm from "./components/StateSelectionForm";

export default function Home() {
  return (
    <main className="w-[623px] h-[100px]">
      <StateSelectionForm />
      <Entities />
    </main>
  );
}
