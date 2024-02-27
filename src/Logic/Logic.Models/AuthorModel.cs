namespace devdeer.BookStore.Logic.Models
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;
    using Newtonsoft.Json;

    /// <summary>
    /// An author model represented in the database.
    /// </summary>
    public class AuthorModel : ISoftDelete, IVersioned
    {
        /// <summary>
        /// Represents the unique identifier of the author in the database.
        /// </summary>
        [Column(nameof(Id), Order = 1)]
        [Key]
        public long Id { get; set; }

        /// <summary>
        /// The name of the author.
        /// </summary>
        [Column(nameof(Name), Order = 10)]
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = default!;

        /// <summary>
        /// The surname of the author.
        /// </summary>
        [Column(nameof(Surname), Order = 11)]
        [Required]
        [StringLength(50)]
        public string Surname { get; set; } = default!;

        /// <summary>
        /// The age of the author.
        /// </summary>
        [Column(nameof(Age), Order = 12)]
        [Required]
        public int Age { get; set; } = default;
        /// <summary>
        /// The birth date of the author.
        /// </summary>
        [Column(nameof(BirthDate), Order = 13)]
        [Required]
        public DateTimeOffset BirthDate { get; set; } = default!;

        /// <inheritdoc/>
        [Column(nameof(IsDeleted), Order = 14)]
        [Required]
        public bool IsDeleted { get; set; } = false;

        /// <inheritdoc/>
        [Column(nameof(DeletedAt), Order = 30)]
        public DateTimeOffset? DeletedAt { get; set; }

        /// <summary>
        /// The books written by the author.
        /// </summary>
        /// <remarks>
        /// Establishes an n to m relationship.
        /// </remarks>
        [JsonIgnore]
        public required List<BookModel> Books { get; set; }

        /// <inheritdoc/>
        [Column(nameof(Version), Order = 15)]
        [Required]
        public int Version { get; set; } = 1;
    }
}
