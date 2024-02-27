namespace devdeer.BookStore.Data.Configurations
{
    using devdeer.BookStore.Logic.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    /// <summary>
    /// The configuration for the <see cref="AuthorModel"/> entity. The configuration filters out deleted entities, auto-includes <see cref="BookModel"/>s in the queries and creates a temporal table for the <see cref="AuthorModel"/> entity.
    /// </summary>
    public class AuthorModelConfiguration : IEntityTypeConfiguration<AuthorModel>
    {
        public void Configure(EntityTypeBuilder<AuthorModel> builder)
        {

            builder.HasQueryFilter(q => q.IsDeleted == false);
            builder.Navigation(e => e.Books).AutoInclude();
            builder.ToTable("Authors", tb => tb.IsTemporal(ttb =>
            {
                ttb.HasPeriodStart("AuthorCreation");
                ttb.HasPeriodEnd("AuthorRemoval");
            }));
        }
    }
}

