// The page for book search by its id and version.
import FetchBookVersionBlock from "@/app/components/Books/FetchBookVersion";
import SearchFormVersionBlocks from "@/app/components/SearchFormVersionBlocks";
import { FetchBookVersion } from "@/app/functions/FetchBookVersion";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Page({
  params: { bookId, bookVersion },
}: {
  params: { bookId: string; bookVersion: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["books-version", [bookId, bookVersion]],
    queryFn: () => FetchBookVersion(bookId, bookVersion),
  });
  return (
    <main className="w-[410px]">
      <div className="flex justify-center items-center flex-col">
        <SearchFormVersionBlocks mode="book" />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FetchBookVersionBlock bookId={bookId} version={bookVersion} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
