import { useQuery } from "@tanstack/react-query";

export function FetchBookVersion(id: number, version: number) {
  return useQuery<IBookModel, Error>({
    queryKey: ["bookByVersion"],
    queryFn: async () => {
      return await fetch(
        `https://localhost:5001/api/v1/BookStore/Book/${id}/${version}`
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
    },
    refetchOnWindowFocus: false,
    enabled: false,
    refetchInterval: 5000,
  });
}
