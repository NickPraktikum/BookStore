// The page for the book search by its id.
import FetchBook from "@/app/components/Books/FetchBook";
import SearchFormBlocks from "@/app/components/SearchFormBlocks";
import { FetchBookById } from "@/app/functions/FetchBookById";
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
      <div className="flex items-center flex-col">
        <SearchFormBlocks mode={"book"} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FetchBook bookId={bookId} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
