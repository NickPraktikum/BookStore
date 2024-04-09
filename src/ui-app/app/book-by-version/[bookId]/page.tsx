import Book from "@/app/components/Book";
import SearchFormVersionBlocks from "@/app/components/SearchFormVersionBlocks";

export default async function Page({
  params: { bookId },
}: {
  params: { bookId: string };
}) {
  var book: IBookModel = await FetchBookByVersion(bookId, "1");
  return (
    <main className="w-[410px]">
      <div className="flex justify-center items-center flex-col">
        <SearchFormVersionBlocks mode="book" />
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