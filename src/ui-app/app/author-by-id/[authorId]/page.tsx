// The page for the author search by his id.
import FetchAuthor from "@/app/components/Authors/FetchAuthor";
import SearchFormBlocks from "@/app/components/SearchFormBlocks";
import { FetchAuthorById } from "@/app/functions/FetchAuthorById";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Deleted({
  params: { authorId },
}: {
  params: { authorId: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["books", authorId],
    queryFn: () => FetchAuthorById(authorId),
  });
  return (
    <main className="w-[410px]">
      <div className="flex items-center flex-col">
        <SearchFormBlocks mode={"author"} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FetchAuthor authorId={authorId} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
