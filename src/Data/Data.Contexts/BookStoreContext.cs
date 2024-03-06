namespace devdeer.BookStore.Data.Contexts.v1
{
    using devdeer.BookStore.Data.Configurations;
    using devdeer.BookStore.Data.Entities;
    using devdeer.BookStore.Data.Interceptors;
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// The central context of the app.
    /// </summary>
    public class BookStoreContext : DbContext
    {
        #region constructors and destructors

        public BookStoreContext(DbContextOptions<BookStoreContext> options) : base(options)
        {
        }

        #endregion

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.AddInterceptors(new SoftDeleteInterceptor());
                optionsBuilder.AddInterceptors(new UpdateVersionInterceptor());
            }
        }

        /// <inheritdoc />
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookEntity>(x =>
            {
                x.HasIndex(i => i.Isbn, "UX_Books_Isbn").IsUnique();
                x.HasIndex(i => i.Title, "IX_Books_Title");
                x.Property(e => e.DeletedAt).IsRequired(false);
            });
            modelBuilder.Entity<AuthorEntity>(x =>
            {
                x.HasIndex(i => i.Surname, "IX_Authors_Surname");
            });
            modelBuilder.Entity<BookEntity>().ToTable("Books").ToTable(tb => tb.IsTemporal(ttb =>
            {
                ttb.HasPeriodStart("BookCreation");
                ttb.HasPeriodEnd("BookRemoval");
            }));
            modelBuilder.Entity<AuthorEntity>().ToTable("Authors").ToTable(tb => tb.IsTemporal(ttb =>
            {
                ttb.HasPeriodStart("AuthorCreation");
                ttb.HasPeriodEnd("AuthorRemoval");
            }));

            modelBuilder.ApplyConfiguration(new AuthorEntityConfiguration());
            modelBuilder.ApplyConfiguration(new BookEntityConfiguration());
        }

        public DbSet<AuthorEntity> Authors { get; set; }
        public DbSet<BookEntity> Books { get; set; }

    }
}
