import Author from "@/app/components/Author";

export default async function Deleted({
  params: { authorId },
}: {
  params: { authorId: string };
}) {
  var author: IAuthorModel = await FetchAuthorById(authorId);
  return (
    <main className="w-[410px]">
      <div className="px-[20px] flex justify-between items-center pb-[50px] pt-[30px]">
        <h3 className="font-bold text-[20px]">Author by id</h3>
        <div className="flex justify-between items-center gap-[8px] bg-[#ECECEC] rounded-lg drop-shadow-md shadow-md">
          <svg
            className="h-[39px] ml-[13px]"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.14579 14.875C11.8622 14.875 14.875 11.8623 14.875 8.14584C14.875 4.42942 11.8622 1.41667 8.14579 1.41667C4.42938 1.41667 1.41663 4.42942 1.41663 8.14584C1.41663 11.8623 4.42938 14.875 8.14579 14.875Z"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.5833 15.5833L14.1666 14.1667"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <input
            type="text"
            placeholder="Find an author"
            className="w-[186px] h-[39px] bg-[#ECECEC] placeholder:text-black placeholder:font-medium focus:outline-none rounded-lg border-none"
          />
        </div>
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
