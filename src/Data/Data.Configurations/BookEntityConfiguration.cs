namespace devdeer.BookStore.Data.Configurations
{
    using devdeer.BookStore.Data.Entities;
    using devdeer.BookStore.Logic.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    /// <summary>
    /// The configuration for the <see cref="BookEntity"/> entity. The configuration filters out deleted entities, auto-includes <see cref="AuthorModel"/> in the queries and creates a temporal table for the <see cref="BookEntity"/> entity.
    /// </summary>
    public class BookEntityConfiguration : IEntityTypeConfiguration<BookEntity>
    {
        public void Configure(EntityTypeBuilder<BookEntity> builder)
        {

            builder.HasQueryFilter(q => q.IsDeleted == false);
            builder.Navigation(e => e.Author).AutoInclude();
            builder.ToTable("Books", tb => tb.IsTemporal(ttb =>
            {
                ttb.HasPeriodStart("BookCreation");
                ttb.HasPeriodEnd("BookRemoval");
            }));
        }
    }
}
