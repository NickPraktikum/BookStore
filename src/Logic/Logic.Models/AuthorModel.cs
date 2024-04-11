namespace devdeer.BookStore.Logic.Models
{
    using System.Text.Json.Serialization;

    /// <summary>
    /// An author model represented in-memory.
    /// </summary>
    public class AuthorModel : ISoftDelete, IVersioned
    {
        /// <summary>
        /// Represents the unique identifier of the author in-memory.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The name of the author.
        /// </summary>
        public string Name { get; set; } = default!;

        /// <summary>
        /// The surname of the author.
        /// </summary>
        public string Surname { get; set; } = default!;

        /// <summary>
        /// The age of the author.
        /// </summary>
        public int Age => (int)((DateTime.Now - BirthDate).TotalDays / 365.242199);
        /// <summary>
        /// The birth date of the author.
        /// </summary>
        public DateTimeOffset BirthDate { get; set; } = default!;

        /// <inheritdoc/>
        public bool IsDeleted { get; set; } = false;

        /// <inheritdoc/>
        public DateTimeOffset? DeletedAt { get; set; }

        /// <summary>
        /// The books written by the author.
        /// </summary>
        /// <remarks>
        /// Establishes an n to m relationship.
        /// </remarks>

        public ICollection<BookModel>? Books { get; set; }

        /// <inheritdoc/>
        public int Version { get; set; } = 1;
    }
}
