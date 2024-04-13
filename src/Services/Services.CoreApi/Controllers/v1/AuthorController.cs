namespace devdeer.BookStore.Services.CoreApi.Controllers.v1
{
    using devdeer.BookStore.Data.Entities;
    using devdeer.BookStore.Logic.Interfaces;
    using devdeer.BookStore.Logic.Models.CreateModels;
    using devdeer.BookStore.Logic.Models.UpdateModels;
    using devdeer.BookStore.Logic.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;
    /// <summary>
    /// Provides endpoints to handle author data.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthorController : ControllerBase
    {

        /// <summary>
        /// The business logic for this controller.
        /// </summary>
        private IBookStoreLogic Logic { get; }

        /// <summary>
        /// The default constructor.
        /// </summary>
        /// <param name="logic">The business logic for this controller.</param>
        public AuthorController(IBookStoreLogic logic)
        {
            Logic = logic;
        }

        /// <summary>
        /// Creates a new author in the backend.
        /// </summary>
        /// <param name="model">The data needed to create the author.</param>
        /// <returns>The data of the created author.</returns>
        /// <response code="200">The author was created successfully.</response>
        /// <response code="400">The author could not be created.</response>
        [HttpPost()]
        public async Task<ActionResult<AuthorModel>> CreateAuthor(CreateAuthorModel model)
        {
            var result = await Logic.CreateAuthorAsync(model);
            return Ok(result);
        }

        /// <summary>
        /// Removes an author identified by the given <paramref name="id" /> from the backend.
        /// </summary>
        /// <param name="id">The unique id of the author in the backend.</param>
        /// <returns>
        /// <c>true</c> if the author was deleted successfully otherwise <c>false</c>.
        /// </returns>
        /// <response code="200">All author was deleted successfully.</response>
        /// <response code="400">The author could not be deleted.</response>
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteAuthor(long id)
        {
            var result = await Logic.DeleteAuthorAsync(id);
            return Ok(result);
        }

        /// <summary>
        /// Retrieves all of the available authors from the backend.
        /// </summary>
        /// <returns>The list of all the available authors in the backend.</returns>
        /// <response code="200">At least 1 available author was retrieved successfully.</response>
        /// <response code="404">No available authors were found.</response>
        [HttpGet("Available")]
        public async Task<ActionResult<IEnumerable<AuthorModel>?>> GetAllAvailableAuthors()
        {
            var result = await Logic.GetAllAvailableAuthorsAsync();
            return Ok(result);
        }

        /// <summary>
        /// Retrieves all of the deleted authors from the backend.
        /// </summary>
        /// <returns>The list of all the deleted authors in the backend.</returns>
        /// <response code="200">At least 1 deleted author was retrieved successfully.</response>
        /// <response code="404">No deleted authors were found.</response>
        [HttpGet("Deleted")]
        public async Task<ActionResult<IEnumerable<AuthorModel>?>> GetAllDeletedAuthors()
        {
            var result = await Logic.GetAllDeletedAuthorsAsync();
            return result.IsNullOrEmpty() ? NotFound() : Ok(result);
        }
        /// <summary>
        /// Updates the author identified by <paramref name="id"/> based on the new author data.
        /// </summary>
        /// <param name="id">The unique id of the author in the database.</param>
        /// <param name="model">The new author data.</param>
        /// <returns>The updated author.</returns>
        /// <response code="200">The author was updated successfully.</response>
        /// <response code="400">The author could not be updated.</response>
        [HttpPatch("{id}")]
        public async Task<ActionResult<AuthorModel>> UpdateAuthor(long id, UpdateAuthorModel model)
        {
            var result = await Logic.UpdateAuthorAsync(id, model);
            return Ok(result);
        }

        /// <summary>
        /// Retrieves a single author identified by the given <paramref name="id" />.
        /// </summary>
        /// <param name="id">The id of the author in the backend.</param>
        /// <returns>The data of the retrieved author.</returns>
        /// <response code="200">The author was found successfully.</response>
        /// <response code="400">The author couldn't be retrieved.</response>
        [HttpGet("{id}")]
        public async Task<ActionResult<AuthorEntity?>> GetAuthorById(long id)
        {
            var result = await Logic.GetAuthorByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }
        /// <summary>
        /// Retrieves the specified version(<paramref name="version"/>) of the author identified by the given <paramref name="id" />.
        /// </summary>
        /// <param name="id">The id of the author in the backend.</param>
        /// <param name="version">The version of the author in the backend.</param>
        /// <returns>The data of the retrieved author.</returns>
        /// <response code="200">The author was found successfully.</response>
        /// <response code="400">The author couldn't be retrieved.</response>
        [HttpGet("{id}/{version}")]
        public async Task<ActionResult<AuthorModel?>> GetAuthorByVersion(long id, int version)
        {
            var result = await Logic.GetAuthorByVersionAsync(id, version);
            return result == null ? NotFound() : Ok(result);
        }
    }
}
