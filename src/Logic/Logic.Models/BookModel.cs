namespace devdeer.BookStore.Logic.Models
{
    /// <summary>
    /// A book model represented in in-memory.
    /// </summary>
    public class BookModel : ISoftDelete, IVersioned
    {
        /// <summary>
        /// Represents the unique identifier of the book in-memory.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The id of the author in the database. 
        /// </summary>
        /// <remarks>
        /// The foreign key referenced to the author entity (<see cref="Author"/>).
        /// </remarks>
        public long AuthorId { get; set; }

        /// <summary>
        /// The ISBN (International Standard Book Number) of the book.
        /// </summary>
        public string Isbn { get; set; } = default!;

        /// <summary>
        /// The title of the book.
        /// </summary>
        public string Title { get; set; } = default!;

        /// <summary>
        /// The number of pages in the book.
        /// </summary>
        public int Pages { get; set; } = default!;

        /// <inheritdoc/>
        public bool IsDeleted { get; set; } = false;

        /// <summary>
        /// The price for the book.
        /// </summary>
        public float Price { get; set; }

        /// <summary>
        /// The short description of the book.
        /// </summary>
        public string Description { get; set; } = default!;

        /// <inheritdoc/>
        public DateTimeOffset? DeletedAt { get; set; } = null!;

        /// <inheritdoc/>
        public int Version { get; set; } = 1;

        /// <summary>
        /// The author of the book
        /// </summary>
        /// <remarks>
        /// The relation between the <see cref="BookModel"/> and <see cref="AuthorModel"/> entities is established via the AuthorId property (<see cref="AuthorId"/>)
        /// </remarks>
        public required AuthorModel Author { get; set; }

    }
}
