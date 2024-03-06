namespace devdeer.BookStore.Logic.Models.CreateModels
{
    public class CreateAuthorModel
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
        /// The birth date of the author.
        /// </summary>
        public DateTimeOffset BirthDate { get; set; } = default!;
    }
}
