import Author from "@/app/components/Author";
import SearchFormBlocks from "@/app/components/SearchFormBlocks";

export default async function Deleted({
  params: { authorId },
}: {
  params: { authorId: string };
}) {
  var author: IAuthorModel = await FetchAuthorById(authorId);
  return (
    <main className="w-[410px]">
      <div className="flex items-center flex-col">
        <SearchFormBlocks mode={"author"} />
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

async function FetchAuthorById(id: string) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/BookStore/Author/${id}`,
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
