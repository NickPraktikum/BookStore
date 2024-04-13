import { useQuery } from "@tanstack/react-query";
import { IBookModel } from "../interfaces/IBookModel";

export async function FetchBookVersion(id: string, version: string) {
  return await fetch(`https://localhost:5001/api/v1/Book/${id}/${version}`)
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
}
