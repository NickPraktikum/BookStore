// The entry page with the search form for a author's search by version and id.
import SearchFormVersion from "../components/SearchFormVersion";

export default function Page() {
  return (
    <main className="w-[410px]">
      <SearchFormVersion mode={"author"} />
    </main>
  );
}
