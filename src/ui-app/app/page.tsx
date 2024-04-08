import React from "react";
import Book from "./components/Book";
import Books from "./components/Books";

export default async function Home() {
  const data: Array<IBookModel> = await FetchAvailableBooks();
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Books</h3>
      </div>
      <Books books={data} text="Available books" />
    </main>
  );
}
async function FetchAvailableBooks() {
  try {
    const res = await fetch(
      "http://localhost:5000/api/v1/BookStore/Book/Available",
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
