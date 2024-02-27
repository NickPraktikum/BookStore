﻿namespace devdeer.BookStore.Data.Contexts.v1
{
    using devdeer.BookStore.Data.Configurations;
    using devdeer.BookStore.Data.Interceptors;
    using devdeer.BookStore.Logic.Models;
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
            modelBuilder.Entity<BookModel>(x =>
            {
                x.HasIndex(i => i.Isbn, "UX_Books_Isbn").IsUnique();
                x.HasIndex(i => i.Title, "IX_Books_Title");
                x.Property(e => e.DeletedAt).IsRequired(false);
            });
            modelBuilder.Entity<AuthorModel>(x =>
            {
                x.HasIndex(i => i.Surname, "IX_Authors_Surname");
            });
            modelBuilder.Entity<BookModel>().ToTable(tb => tb.IsTemporal(ttb =>
            {
                ttb.HasPeriodStart("BookCreation");
                ttb.HasPeriodEnd("BookRemoval");
            }));
            modelBuilder.Entity<AuthorModel>().ToTable(tb => tb.IsTemporal(ttb =>
            {
                ttb.HasPeriodStart("AuthorCreation");
                ttb.HasPeriodEnd("AuthorRemoval");
            }));

            modelBuilder.ApplyConfiguration(new AuthorModelConfiguration());
            modelBuilder.ApplyConfiguration(new BookModelConfiguration());
        }

        public DbSet<AuthorModel> Authors { get; set; }
        public DbSet<BookModel> Books { get; set; }

    }
}
