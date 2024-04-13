import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AvailableAuthors from "../components/Authors/AvailableAuthors";

export default async function Deleted() {
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
async function FetchAvailableAuthors() {
  try {
    const res = await fetch(
      "http://localhost:5000/api/v1/BookStore/Author/Available",
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
