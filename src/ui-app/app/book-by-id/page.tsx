// The entry page with the search form for a book's search by id.
import SearchForm from "../components/SearchForm";

export default async function Page() {
  return <SearchForm mode="book" />;
}
