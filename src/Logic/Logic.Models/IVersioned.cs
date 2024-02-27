namespace devdeer.BookStore.Logic.Models
{
    /// <summary>
    /// Abstract base interface for all other model types.
    /// </summary>
    public interface IVersioned
    {
        /// <summary>
        /// The version of the entity
        /// </summary>
        int Version { get; set; }
    }
}
