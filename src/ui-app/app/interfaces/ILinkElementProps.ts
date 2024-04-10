export interface ILinkElement {
  selected: boolean;
  text: string;
  link: Link;
}

type Link =
  | "/"
  | "/deleted-books"
  | "/available-authors"
  | "/deleted-authors"
  | "/author-by-id"
  | "/book-by-id"
  | "/book-by-version"
  | "/author-by-version";
