import Book from "@/app/components/Book";
import SearchFormBlocks from "@/app/components/SearchFormBlocks";
import Link from "next/link";

export default async function Deleted({
  params: { bookId },
}: {
  params: { bookId: string };
}) {
  var book: IBookModel = await FetchBookById(bookId);
  return (
    <main className="w-[410px]">
      <div className="flex items-center flex-col">
        <SearchFormBlocks mode={"book"} />
        <Book
          id={book.id}
          ISBN={book.isbn}
          title={book.title}
          version={book.version}
        />
      </div>
    </main>
  );
}

async function FetchBookById(id: string) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/BookStore/Book/${id}`,
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
