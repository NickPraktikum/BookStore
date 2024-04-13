namespace devdeer.BookStore.Services.CoreApi.Controllers.v1
{
    using devdeer.BookStore.Data.Contexts.v1;
    using devdeer.BookStore.Data.Entities;
    using devdeer.BookStore.Logic.Interfaces;
    using devdeer.BookStore.Logic.Models;
    using devdeer.BookStore.Logic.Models.CreateModels;
    using devdeer.BookStore.Logic.Models.UpdateModels;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;

    /// <summary>
    /// Provides endpoints to handle book data.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BookController : ControllerBase
    {

        /// <summary>
        /// The business logic for this controller.
        /// </summary>
        private IBookStoreLogic Logic { get; }

        /// <summary>
        /// The default constructor.
        /// </summary>
        /// <param name="logic">The business logic for this controller.</param>
        public BookController(IBookStoreLogic logic)
        {
            Logic = logic;
        }

        /// <summary>
        /// Creates a new book in the backend.
        /// </summary>
        /// <param name="model">The data needed to create the book.</param>
        /// <returns>The data of the created book.</returns>
        /// <response code="200">The book was created successfully.</response>
        /// <response code="400">The book could not be created.</response>
        [HttpPost("Book")]
        public async Task<ActionResult<BookModel>> CreateBook(CreateBookModel model)
        {
            var result = await Logic.CreateBookAsync(model);
            return Ok(result);
        }

        /// <summary>
        /// Removes a book identified by the given <paramref name="id" /> from the backend.
        /// </summary>
        /// <param name="id">The unique id of the book in the backend.</param>
        /// <returns>
        /// <c>true</c> if the book was deleted successfully otherwise <c>false</c>.
        /// </returns>
        /// <response code="200">All book was deleted successfully.</response>
        /// <response code="400">The book could not be deleted.</response>
        [HttpDelete("Book/{id}")]
        public async Task<ActionResult<bool>> DeleteBook(long id)
        {
            var result = await Logic.DeleteBookAsync(id);
            return Ok(result);
        }

        /// <summary>
        /// Retrieves all of the available books from the backend.
        /// </summary>
        /// <returns>The list of all the available books in the backend.</returns>
        /// <response code="200">At least 1 available book was retrieved successfully.</response>
        /// <response code="404">No available books were found.</response>
        [HttpGet("Book/Available")]
        public async Task<ActionResult<IEnumerable<BookModel>?>> GetAllAvailableBooks()
        {
            var result = await Logic.GetAllAvailableBooksAsync();
            return Ok(result);
        }

        /// <summary>
        /// Retrieves all of the deleted books from the backend.
        /// </summary>
        /// <returns>The list of all the deleted books in the backend.</returns>
        /// <response code="200">At least 1 deleted book was retrieved successfully.</response>
        /// <response code="404">No deleted books were found.</response>
        [HttpGet("Book/Deleted")]
        public async Task<ActionResult<IEnumerable<BookModel>?>> GetAllDeletedBooks()
        {
            var result = await Logic.GetAllDeletedBooksAsync();
            return result.IsNullOrEmpty() ? NotFound() : Ok(result);
        }

        /// <summary>
        /// Updates the book identified by <paramref name="id"/> based on the new book data.
        /// </summary>
        /// <param name="id">The unique id of the book in the database.</param>
        /// <param name="model">The new book data.</param>
        /// <returns>The updated author.</returns>
        /// <response code="200">The book was updated successfully.</response>
        /// <response code="400">The book could not be updated.</response>
        [HttpPatch("Book/{id}")]
        public async Task<ActionResult<BookModel>> UpdateBook(long id, UpdateBookModel model)
        {
            var result = await Logic.UpdateBookAsync(id, model);
            return Ok(result);
        }
        /// <summary>
        /// Retrieves a single book identified by the given <paramref name="id" />.
        /// </summary>
        /// <param name="id">The id of the book in the backend.</param>
        /// <returns>The data of the retrieved book.</returns>
        /// <response code="200">The book was found successfully.</response>
        /// <response code="400">The book couldn't be retrieved.</response>
        [HttpGet("Book/{id}")]
        public async Task<ActionResult<BookEntity?>> GetBookById(long id)
        {
            var result = await Logic.GetBookByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        /// <summary>
        /// Retrieves the specified version(<paramref name="version"/>) of the book identified by the given <paramref name="id" />.
        /// </summary>
        /// <param name="id">The id of the book in the backend.</param>
        /// <param name="version">The version of the author in the backend.</param>
        /// <returns>The data of the retrieved book.</returns>
        /// <response code="200">The book was found successfully.</response>
        /// <response code="400">The book couldn't be retrieved.</response>
        [HttpGet("Book/{id}/{version}")]
        public async Task<ActionResult<BookModel?>> GetBookByVersion(long id, int version)
        {
            var result = await Logic.GetBookByVersionAsync(id, version);
            return result == null ? NotFound() : Ok(result);
        }

    }
}
