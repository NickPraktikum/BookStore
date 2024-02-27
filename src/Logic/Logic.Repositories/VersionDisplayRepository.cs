namespace devdeer.BookStore.Logic.Repositories
{
    using devdeer.BookStore.Data.Contexts.v1;
    using devdeer.BookStore.Logic.Common.Exceptions;
    using devdeer.BookStore.Logic.Interfaces;
    using devdeer.BookStore.Logic.Models;
    using Microsoft.EntityFrameworkCore;
    public class VersionDisplayRepository : IVersionDisplayRepository
    {
        public readonly BookStoreContext _context;
        public VersionDisplayRepository(BookStoreContext context) { 
            _context = context;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> GetAuthorByVersionAsync(long id, int version)
        {
            var authorChangedOn = await _context.Authors
                .TemporalAll().IgnoreQueryFilters().Where(author => author.Id == id).OrderBy(author => EF.Property<DateTime>(author, "AuthorRemoval")).Where(author => author.Version == version).Select(author => EF.Property<DateTime>(author, "AuthorRemoval")).ToListAsync();
            if (authorChangedOn.Count == 0)
            {
                throw new EntityNotFoundException("Such book wasn't found!");
            }
            else
            {
                var authorChangeTime = authorChangedOn.LastOrDefault();
                var authorAndBooks = await _context.Authors
            .TemporalAsOf(authorChangeTime.AddMilliseconds(-1)).IgnoreQueryFilters().Where(author => author.Id == id).FirstOrDefaultAsync();
                return authorAndBooks!;
            }
        }

        /// <inheritdoc/>
        public async Task<BookModel> GetBookByVersionAsync(long id, int version)
        {
            var bookChangedOn = await _context.Books
                .TemporalAll().IgnoreQueryFilters().Where(book => book.Id == id).OrderBy(book => EF.Property<DateTime>(book, "BookRemoval")).Where(book => book.Version == version).Select(book => EF.Property<DateTime>(book, "BookRemoval")).ToListAsync();
            if(bookChangedOn.Count == 0)
            {
                throw new EntityNotFoundException("Such book wasn't found!");
            }else{
                var bookChangeTime = bookChangedOn.LastOrDefault();
                var book = await _context.Books
                    .TemporalAsOf(bookChangeTime.AddMilliseconds(-1)).IgnoreQueryFilters().Where(book => book.Id == id).FirstOrDefaultAsync();
                return book;
            }

        }
    }
}
