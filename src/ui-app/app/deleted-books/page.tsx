import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { IBookModel } from "../interfaces/IBookModel";
import DeletedBooks from "../components/Books/DeletedBooks";
import { FetchDeletedBooks } from "../functions/FetchDeletedBooks";

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
        <DeletedBooks text="Deleted books" />
      </HydrationBoundary>
    </main>
  );
}
