﻿namespace devdeer.BookStore.Data.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel.DataAnnotations;
    using devdeer.BookStore.Logic.Models;

    /// <summary>
    /// A book entity represented in the database.
    /// </summary>
    public class BookEntity : ISoftDelete, IVersioned
    {
        /// <summary>
        /// Represents the unique identifier of the book in the database.
        /// </summary>
        [Column(nameof(Id), Order = 1)]
        [Key]
        public long Id { get; set; }

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
        public required List<AuthorEntity> Authors { get; set; }

    }
}
