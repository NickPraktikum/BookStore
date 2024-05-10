// The method that fetches all deleted books.
export async function FetchDeletedBooks() {
  return await fetch("https://localhost:5001/api/v1/Book/Deleted", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
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
