using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace devdeer.BookStore.Logic.Models.CreateModels
{
    public class CreateBookModel
    {
        /// <summary>
        /// The id of the author in the database. 
        /// </summary>
        /// <remarks>
        /// The foreign key referenced to the author entity (<see cref="BookModel.Author"/>).
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

        /// <summary>
        /// The price for the book.
        /// </summary>
        public float Price { get; set; }

        /// <summary>
        /// The short description of the book.
        /// </summary>
        public string Description { get; set; } = default!;
    }
}
