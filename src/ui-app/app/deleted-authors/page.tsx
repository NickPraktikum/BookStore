import { revalidatePath } from "next/cache";
import Authors from "../components/Authors";
import Books from "../components/Books";

export default async function Deleted() {
  const data: IAuthorModel[] = await FetchDeletedAuthors();
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Books</h3>
      </div>
      <Authors authors={data} text="Deleted authors" />
    </main>
  );
}

async function FetchDeletedAuthors() {
  console.log("Revalidation");
  try {
    const res = await fetch(
      "http://localhost:5000/api/v1/BookStore/Author/Deleted",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 10 },
      }
    );
    if (res.status == 404) {
      throw Error("Not Found");
    }
    revalidatePath("/deleted-authors", "page");
    return await res.json();
  } catch (e) {
    return String(e);
  }
}
