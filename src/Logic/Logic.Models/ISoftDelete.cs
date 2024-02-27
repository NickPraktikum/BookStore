namespace devdeer.BookStore.Logic.Models
{
    /// <summary>
    /// Abstract base interface for all other model types.
    /// </summary>
    public interface ISoftDelete
    {
        /// <summary>
        /// The state of the entity in the database.
        /// </summary>
        /// <remarks>
        /// Equals <c>true</c> if the entity has been deleted or <c>false</c> otherwise.
        /// </remarks>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// The date of the entity deletion.
        /// </summary>
        /// <remarks>
        /// Equals <c>null</c> if the entity hasn't been deleted yet.
        /// </remarks>
        public DateTimeOffset? DeletedAt { get; set; }
    }
}
