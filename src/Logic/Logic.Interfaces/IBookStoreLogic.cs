using System.Reflection;

namespace devdeer.BookStore.Logic.Interfaces
{
    using devdeer.BookStore.Logic.Models;
    using devdeer.BookStore.Logic.Models.CreateModels;
    using devdeer.BookStore.Logic.Models.UpdateModels;

    public interface IBookStoreLogic
    {
        /// <summary>
        /// Creates a new book in the database.
        /// </summary>
        /// <param name="model">The metadata needed for the book creation.</param>
        /// <returns>The data of the created book.</returns>
        Task<BookModel?> CreateBookAsync(CreateBookModel model);
        /// <summary>
        /// Creates a new author in the database.
        /// </summary>
        /// <param name="model">The metadata needed for the author creation.</param>
        /// <returns>The data of the created author.</returns>
        Task<AuthorModel> CreateAuthorAsync(CreateAuthorModel model);
        /// <summary>
        /// Removes the book from the database.
        /// </summary>
        /// <param name="id">The id of the book in the database</param>
        /// <returns><c>true</c> if the book was deleted successfully or <c>false</c> otherwise.</returns>
        Task<bool> DeleteBookAsync(long id);
        /// <summary>
        /// Removes the author from the database.
        /// </summary>
        /// <param name="id">The id of the author in the database</param>
        /// <returns><c>true</c> if the author was deleted successfully or <c>false</c> otherwise.</returns>
        Task<bool> DeleteAuthorAsync(long id);
        /// <summary>
        /// Retrieves all available books in the database.
        /// </summary>
        /// <returns>A list of available books or an empty list if no available books were found./></returns>
        Task<BookModel[]?> GetAllAvailableBooksAsync();
        /// <summary>
        /// Retrieves all available authors in the database.
        /// </summary>
        /// <returns>A list of available authors or an empty list if no available authors were found./></returns>
        Task<AuthorModel[]?> GetAllAvailableAuthorsAsync();
        /// <summary>
        /// Retrieves all deleted books from the database.
        /// </summary>
        /// <returns>A list of deleted books or an empty list if no deleted books were found.</returns>
        Task<BookModel[]?> GetAllDeletedBooksAsync();
        /// <summary>
        /// Retrieves all deleted authors from the database.
        /// </summary>
        /// <returns>A list of deleted authors or an empty list if no deleted authors were found.</returns>
        Task<AuthorModel[]?> GetAllDeletedAuthorsAsync();
        /// <summary>
        /// Updates the author by a provided id.
        /// </summary>
        /// <param name="id">The id of the author in the database.</param>
        /// <param name="model">The model of the updated version of the author.</param>
        /// <returns>The data of the updated author.</returns>
        Task<AuthorModel> UpdateAuthorAsync(long id, UpdateAuthorModel model);
        /// <summary>
        /// Updates the book by a provided id.
        /// </summary>
        /// <param name="id">The id of the book in the database.</param>
        /// <param name="model">The model of the updated version of the book.</param>
        /// <returns>The data of the updated book.</returns>
        Task<BookModel> UpdateBookAsync(long id, UpdateBookModel model);
        /// <summary>
        /// Retrieves a single book by a provided id.
        /// </summary>
        /// <param name="id">The id of the book in the database.</param>
        /// <returns>The data of the retrieved book.</returns>
        Task<BookModel> GetBookByIdAsync(long id);
        /// <summary>
        /// Retrieves an author by a provided id.
        /// </summary>
        /// <param name="id">The id of the author in the database.</param>
        /// <returns>The data of the retrieved author.</returns>
        Task<AuthorModel> GetAuthorByIdAsync(long id);
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
