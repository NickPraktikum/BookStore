import Book from "@/app/components/Book";
import SearchFormVersionBlocks from "@/app/components/SearchFormVersionBlocks";
import { IBookModel } from "@/app/interfaces/IBookModel";

export default async function Page({
  params: { bookId, bookVersion },
}: {
  params: { bookId: string; bookVersion: string };
}) {
  var book: IBookModel = await FetchBookByVersion(bookId, bookVersion);
  return (
    <main className="w-[410px]">
      <div className="flex justify-center items-center flex-col">
        <SearchFormVersionBlocks mode="book" />
        <Book
          id={book.id}
          isbn={book.isbn}
          title={book.title}
          version={book.version}
        />
      </div>
    </main>
  );
}

async function FetchBookByVersion(id: string, version: string) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/BookStore/Book/${id}/${version}`,
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
