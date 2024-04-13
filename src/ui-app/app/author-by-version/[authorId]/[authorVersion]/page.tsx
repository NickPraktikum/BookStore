import FetchAuthorVersionBlock from "@/app/components/Authors/FetchAuthorVersion";
import SearchFormVersionBlocks from "@/app/components/SearchFormVersionBlocks";
import { FetchAuthorVersion } from "@/app/functions/FetchAuthorVersion";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Page({
  params: { authorId, authorVersion },
}: {
  params: { authorId: string; authorVersion: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["authors-version", [authorId, authorVersion]],
    queryFn: () => FetchAuthorVersion(authorId, authorVersion),
  });
  return (
    <main className="w-[410px]">
      <div className="flex justify-center items-center flex-col">
        <SearchFormVersionBlocks mode="author" />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FetchAuthorVersionBlock
            authorId={authorId}
            version={authorVersion}
          />
        </HydrationBoundary>
      </div>
    </main>
  );
}
