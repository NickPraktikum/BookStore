// The page for the author search by his id.
import FetchAuthor from "@/app/components/Authors/FetchAuthor";
import SearchFormVersionBlocks from "@/app/components/SearchFormVersionBlocks";
import { FetchAuthorById } from "@/app/functions/FetchAuthorById";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Page({
  params: { authorId },
}: {
  params: { authorId: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["authors", authorId],
    queryFn: () => FetchAuthorById(authorId),
  });
  return (
    <main className="w-[410px]">
      <div className="flex justify-center items-center flex-col">
        <SearchFormVersionBlocks mode="author" />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FetchAuthor authorId={authorId} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
