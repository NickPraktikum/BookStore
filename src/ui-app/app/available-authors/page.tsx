import Books from "../components/Books";

export default async function Deleted() {
  const data: Array<IAuthorModel> = await FetchAvailableAuthors();
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Available Books</h3>
        <input
          type="text"
          placeholder="Find book"
          className="w-[186px] h-[39px] bg-[#ECECEC] placeholder:text-black placeholder:font-medium rounded-lg drop-shadow-md shadow-md"
        />
      </div>
      <Books books={data} />
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
