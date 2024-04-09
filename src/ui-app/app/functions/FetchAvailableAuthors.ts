import { useQuery } from "@tanstack/react-query";

export function FetchAvailableAuthors() {
  const queryKey = ["availableAuthors"];
  const queryFn = async () => {
    return await fetch(
      "https://localhost:5001/api/v1/BookStore/Author/Available"
    )
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
  };
  return { queryKey, queryFn };
}
