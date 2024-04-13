import React from "react";
import Book from "./components/Books/Book";
import Books from "./components/Books/AvailableBooks";
import { IBookModel } from "./interfaces/IBookModel";
import AvailableBooks from "./components/Books/AvailableBooks";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { FetchAvailableBooks } from "./functions/FetchAvailableBooks";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["available-books"],
    queryFn: FetchAvailableBooks,
  });
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Books</h3>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AvailableBooks text="Available books" />
      </HydrationBoundary>
    </main>
  );
}
