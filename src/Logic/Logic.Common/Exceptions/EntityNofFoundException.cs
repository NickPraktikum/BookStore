namespace devdeer.BookStore.Logic.Common.Exceptions
{
    /// <summary>
    /// Is thrown if during an operation an entity could not be found.
    /// </summary>
    public class EntityNotFoundException : Exception
    {
        #region constructors and destructors

        /// <summary>
        /// Constructor with <paramref name="id" />.
        /// </summary>
        /// <param name="id">The unique id of the entity which wasn't found.</param>
        public EntityNotFoundException(long id) : base($"Entity with id {id} not found.")
        {
        }

        /// <inheritdoc />
        public EntityNotFoundException(string message) : base(message)
        {
        }

        /// <inheritdoc />
        public EntityNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        #endregion
    }
}
