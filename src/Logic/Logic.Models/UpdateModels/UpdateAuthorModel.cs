using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace devdeer.BookStore.Logic.Models.UpdateModels
{
    public class UpdateAuthorModel
    {
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
        public int Age { get; set; }

        /// <summary>
        /// The birth date of the author.
        /// </summary>
        public DateTimeOffset BirthDate { get; set; } = default!;
    }
}
