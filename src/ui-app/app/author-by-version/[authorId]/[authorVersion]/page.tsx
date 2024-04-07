import Author from "@/app/components/Author";

export default async function Page({
  params: { authorId, authorVersion },
}: {
  params: { authorId: string; authorVersion: string };
}) {
  var author: IAuthorModel = await FetchAuthorByVersion(
    authorId,
    authorVersion
  );
  return (
    <main className="w-[410px]">
      <div className="px-[30px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Author by version</h3>
        <input
          type="text"
          placeholder="Find an author"
          className="w-[186px] h-[39px] bg-[#ECECEC] placeholder:text-black placeholder:font-medium rounded-lg drop-shadow-md shadow-md"
        />
      </div>
      <div className="flex justify-center items-center">
        <Author
          id={author.id}
          name={author.name}
          surname={author.surname}
          age={author.age}
          birthDate={author.birthDate}
          isDeleted={author.isDeleted}
          deletedAt={author.deletedAt}
          books={author.books}
          version={author.version}
        />
      </div>
    </main>
  );
}

async function FetchAuthorByVersion(id: string, version: string) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/BookStore/Author/${id}/${version}`,
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
