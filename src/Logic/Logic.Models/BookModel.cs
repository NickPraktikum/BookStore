﻿namespace devdeer.BookStore.Logic.Models
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;
    using Newtonsoft.Json;

    /// <summary>
    /// A book model represented in in-memory.
    /// </summary>
    public class BookModel : ISoftDelete, IVersioned
    {
        /// <summary>
        /// Represents the unique identifier of the book in-memory.
        /// </summary>
        [Column(nameof(Id), Order = 1)]
        [Key]
        public long Id { get; set; }

        /// <summary>
        /// The id of the author in the database. 
        /// </summary>
        /// <remarks>
        /// The foreign key referenced to the author entity (<see cref="Author"/>).
        /// </remarks>
        [Column(nameof(AuthorId), Order = 2)]
        public long AuthorId { get; set; }

        /// <summary>
        /// The ISBN (International Standard Book Number) of the book.
        /// </summary>
        [Column(nameof(Isbn), Order = 10)]
        [Required]
        [StringLength(13)]
        public string Isbn { get; set; } = default!;

        /// <summary>
        /// The title of the book.
        /// </summary>
        [Column(nameof(Title), Order = 11)]
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = default!;

        /// <summary>
        /// The number of pages in the book.
        /// </summary>
        [Column(nameof(Pages), Order = 12)]
        [Required]
        public int Pages { get; set; } = default!;

        /// <inheritdoc/>
        [Column(nameof(IsDeleted), Order = 13)]
        [Required]
        public bool IsDeleted { get; set; } = false;

        /// <summary>
        /// The price for the book.
        /// </summary>
        [Column(nameof(Price), Order = 30)]
        public float Price { get; set; }

        /// <summary>
        /// The short description of the book.
        /// </summary>
        [Column(nameof(Description), Order = 31, TypeName = "ntext")]
        public string Description { get; set; } = default!;

        /// <inheritdoc/>
        [Column(nameof(DeletedAt), Order = 32)]
        public DateTimeOffset? DeletedAt { get; set; } = null!;

        /// <inheritdoc/>
        [Column(nameof(Version), Order = 14)]
        [Required]
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
