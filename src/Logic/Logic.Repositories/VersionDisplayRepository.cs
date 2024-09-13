namespace devdeer.BookStore.Logic.Repositories
{
    using AutoMapper;
    using devdeer.BookStore.Data.Contexts.v1;
    using devdeer.BookStore.Logic.Common.Exceptions;
    using devdeer.BookStore.Logic.Interfaces;
    using devdeer.BookStore.Logic.Models;
    using Microsoft.EntityFrameworkCore;
    using System.ComponentModel.DataAnnotations;

    public class VersionDisplayRepository : IVersionDisplayRepository
    {
        private readonly BookStoreContext _context;
        private readonly IMapper _mapper;
        public VersionDisplayRepository(BookStoreContext context, IMapper mapper) { 
            _context = context;
            _mapper = mapper;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> GetAuthorByVersionAsync(long id, int version)
        {
            var authorInfo = await _context.Authors.TemporalAll().IgnoreAutoIncludes().IgnoreQueryFilters().Where(author => author.Id == id && author.Version == version).Select(author =>
            new {
                Author = author,
                AuthorCreation = EF.Property<DateTime>(author, "AuthorCreation"),
                AuthorRemoval = EF.Property<DateTime>(author, "AuthorRemoval")
            }).FirstOrDefaultAsync();
            if (authorInfo == null)
            {
                throw new EntityNotFoundException("Such author wasn't found!");
            }
            else
            {
                var author = authorInfo.Author;
                var authorVersion = await _context.Authors
            .TemporalAsOf(authorInfo.AuthorRemoval.AddMilliseconds(-1)).IgnoreQueryFilters().Where(author => author.Id == id).FirstOrDefaultAsync();
                var authorModels = _mapper.Map<AuthorModel>(authorVersion);
                return authorModels!;
            }
        }

        /// <inheritdoc/>
        public async Task<BookModel> GetBookByVersionAsync(long id, int version)
        {
            var bookInfo = await _context.Books.TemporalAll().IgnoreQueryFilters().Where(book => book.Id == id &&  book.Version == version).Select(book =>
            new {
                Book = book,
                BookCreation = EF.Property<DateTime>(book, "BookCreation"),
                BookRemoval = EF.Property<DateTime>(book, "BookRemoval")
            }).FirstOrDefaultAsync();
            if (bookInfo == null)
            {
                throw new EntityNotFoundException("Such book wasn't found!");
            }
            else
            {
                var book = bookInfo!.Book;
                var author = await _context.Authors
                    .TemporalAsOf(bookInfo.BookRemoval.AddMilliseconds(-1)).IgnoreQueryFilters().Where(author => author.Id == book.AuthorId).FirstOrDefaultAsync();
                book!.Author = author;
                var bookModel = _mapper.Map<BookModel>(book);
                return bookModel;
            }
        }
    }
}
