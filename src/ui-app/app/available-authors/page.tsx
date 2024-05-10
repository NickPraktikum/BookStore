// The page for available authors retrieval.
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AvailableAuthors from "../components/Authors/AvailableAuthors";
import { FetchAvailableAuthors } from "../functions/FetchAvailableAuthors";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["available-authors"],
    queryFn: FetchAvailableAuthors,
  });
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Authors</h3>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AvailableAuthors text="Available authors" />
      </HydrationBoundary>
    </main>
  );
}
