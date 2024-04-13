import Book from "@/app/components/Books/Book";
import FetchBook from "@/app/components/Books/FetchBook";
import SearchFormVersionBlocks from "@/app/components/SearchFormVersionBlocks";
import { FetchBookById } from "@/app/functions/FetchBookById";
import { IBookModel } from "@/app/interfaces/IBookModel";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Page({
  params: { bookId },
}: {
  params: { bookId: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["books", bookId],
    queryFn: () => FetchBookById(bookId),
  });
  return (
    <main className="w-[410px]">
      <div className="flex justify-center items-center flex-col">
        <SearchFormVersionBlocks mode="book" />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FetchBook bookId={bookId} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
