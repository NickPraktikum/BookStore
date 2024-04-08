import Author from "@/app/components/Author";
import SearchFormVersionBlocks from "@/app/components/SearchFormVersionBlocks";

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
      <div className="flex justify-center items-center flex-col">
        <SearchFormVersionBlocks mode="author" />
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
