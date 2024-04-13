import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { IBookModel } from "../interfaces/IBookModel";
import DeletedBooks from "../components/Books/DeletedBooks";

export default async function Deleted() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["deleted-books"],
    queryFn: FetchDeletedBooks,
  });
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Books</h3>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DeletedBooks text="Deleted authors" />
      </HydrationBoundary>
    </main>
  );
}

async function FetchDeletedBooks() {
  try {
    const res = await fetch(
      "http://localhost:5000/api/v1/BookStore/Book/Deleted",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 5000 },
      }
    );
    if (res.status == 404) {
    }
    return await res.json();
  } catch (e) {
    return String(e);
  }
}
