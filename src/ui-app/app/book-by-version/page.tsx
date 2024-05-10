// The entry page with the search form for a book's search by version and id.
import SearchFormVersion from "../components/SearchFormVersion";

export default function Page() {
  return (
    <main className="w-[410px]">
      <SearchFormVersion mode={"book"} />
    </main>
  );
}
