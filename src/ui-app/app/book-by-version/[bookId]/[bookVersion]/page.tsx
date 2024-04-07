import Book from "@/app/components/Book";

export default async function Page({
  params: { bookId, bookVersion },
}: {
  params: { bookId: string; bookVersion: string };
}) {
  var book: IBookModel = await FetchBookByVersion(bookId, bookVersion);
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Book by version</h3>
        <input
          type="text"
          placeholder="Find a book"
          className="w-[186px] h-[39px] bg-[#ECECEC] placeholder:text-black placeholder:font-medium rounded-lg drop-shadow-md shadow-md"
        />
      </div>
      <div className="flex justify-center items-center">
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
