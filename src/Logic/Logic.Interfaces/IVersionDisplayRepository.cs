namespace devdeer.BookStore.Logic.Interfaces
{
    using devdeer.BookStore.Logic.Models;
    /// <summary>
    /// Must be implemented by types which allow to retrieve certain versions of the entities.
    /// </summary>
    public interface IVersionDisplayRepository
    {
        /// <summary>
        /// Retrieves the specified version of the author by the provided id.
        /// </summary>
        /// <param name="id">The id of the author in the database.</param>
        /// <param name="version">The version of the author in the database.</param>
        /// <returns>The data of the specified version of the author.</returns>
        Task<AuthorModel> GetAuthorByVersionAsync(long id, int version);
        /// <summary>
        /// Retrieves the specified version of the book by the provided id.
        /// </summary>
        /// <param name="id">The id of the book in the database.</param>
        /// <param name="version">The version of the book in the database.</param>
        /// <returns>The data of the specified version of the book.</returns>
        Task<BookModel> GetBookByVersionAsync(long id, int version);
    }
}
