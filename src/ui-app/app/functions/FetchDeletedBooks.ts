import { useQuery } from "@tanstack/react-query";

export function FetchDeletedBooks() {
  return useQuery<IBookModel[], Error>({
    queryKey: ["deletedBooks"],
    queryFn: async () => {
      return await fetch("https://localhost:5001/api/v1/BookStore/Book/Deleted")
        .then(async (res) => {
          if (res.ok) {
            return await res.json();
          } else if (res.status == 404) {
            throw Error("Not Found");
          } else {
            throw Error("Couldn't fetch the books!");
          }
        })
        .catch((err) => {
          throw Error(`${err}`);
        });
    },
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  });
}
