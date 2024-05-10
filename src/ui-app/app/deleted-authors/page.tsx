// The page for deleted authors retrieval.
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import DeletedAuthors from "../components/Authors/DeletedAuthors";
import { FetchDeletedAuthors } from "../functions/FetchDeletedAuthors";

export default async function Deleted() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["deleted-authors"],
    queryFn: FetchDeletedAuthors,
  });
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Books</h3>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DeletedAuthors text="Deleted authors" />
      </HydrationBoundary>
    </main>
  );
}
