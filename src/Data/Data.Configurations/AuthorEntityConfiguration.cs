namespace devdeer.BookStore.Data.Configurations
{
    using Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    /// <summary>
    /// The configuration for the <see cref="AuthorEntity" /> entity. The configuration filters out deleted entities,
    /// auto-includes <see cref="BookEntity" />s in the queries and creates a temporal table for the
    /// <see cref="AuthorEntity" /> entity.
    /// </summary>
    public class AuthorEntityConfiguration : IEntityTypeConfiguration<AuthorEntity>
    {
        #region explicit interfaces

        public void Configure(EntityTypeBuilder<AuthorEntity> builder)
        {
            builder.HasQueryFilter(q => q.IsDeleted == false);
            builder.Navigation(author => author.Books)
                .AutoInclude();

        }

        #endregion
    }
}