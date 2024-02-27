namespace devdeer.BookStore.Logic.Repositories
{
    using devdeer.BookStore.Data.Contexts.v1;
    using devdeer.BookStore.Logic.Common.Exceptions;
    using devdeer.BookStore.Logic.Interfaces;
    using devdeer.BookStore.Logic.Models;
    using devdeer.BookStore.Logic.Models.CreateModels;
    using devdeer.BookStore.Logic.Models.UpdateModels;
    using Microsoft.EntityFrameworkCore;

    public class BookStoreRepository : IBookStoreRepository
    {
        private readonly BookStoreContext _context;
        public BookStoreRepository(BookStoreContext context)
        {
            _context = context;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> CreateAuthorAsync(CreateAuthorModel model)
        {
            var author = new AuthorModel { Name = model.Name, Surname = model.Surname, Age = model.Age, BirthDate = model.BirthDate, Books = new List<BookModel>(), DeletedAt = null, IsDeleted = false, Version = 1};
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();
            return author;
        }

        /// <inheritdoc/>
        public async Task<BookModel?> CreateBookAsync(CreateBookModel model, AuthorModel authorModel)
        {
            var book = new BookModel { Isbn = model.Isbn, Pages = model.Pages, AuthorId = model.AuthorId, Description = model.Description, Title = model.Title, Price = model.Price, IsDeleted = false, DeletedAt = null, Author = authorModel!, Version = 1 };
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return book;
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteAuthorAsync(long id)
        {
            var author = await GetAuthorByIdAsync(id);
            _context.Authors.Remove(author!);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteBookAsync(long id)
        {
            var book = await GetBookByIdAsync(id);
            _context.Books.Remove(book!);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel[]?> GetAllAvailableAuthorsAsync()
        {
            var authors = await _context.Authors.ToArrayAsync();
            return authors;
        }

        /// <inheritdoc/>
        public async Task<BookModel[]?> GetAllAvailableBooksAsync()
        {
            var books = await _context.Books.ToArrayAsync();
            return books;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel[]?> GetAllDeletedAuthorsAsync()
        {
            var authors = await _context.Authors.IgnoreQueryFilters().Where((author) => author.IsDeleted == true).ToArrayAsync();
            return authors;
        }

        /// <inheritdoc/>
        public async Task<BookModel[]?> GetAllDeletedBooksAsync()
        {
            var books = await _context.Books.IgnoreQueryFilters().Where((book) => book.IsDeleted == true).ToArrayAsync();
            return books;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> UpdateAuthorAsync(long id, UpdateAuthorModel model)
        {
            var author = await GetAuthorByIdAsync(id);
            author!.Name = model.Name;
            author.Surname = model.Surname;
            author.Age = model.Age;
            author.BirthDate = model.BirthDate;
            await _context.SaveChangesAsync();
            return author;
        }

        /// <inheritdoc/>
        public async Task<BookModel> UpdateBookAsync(long id, UpdateBookModel model, AuthorModel author)
        {
            var book = await GetBookByIdAsync(id);
            book!.AuthorId = model.AuthorId;
            book.Isbn = model.Isbn;
            book.Pages = model.Pages;
            book.Price = model.Price;
            book.Title = model.Title;
            book.Description = model.Description;
            book.Author = author!;
            await _context.SaveChangesAsync();
            return book;
        }

        /// <inheritdoc/>
        public async Task<BookModel> GetBookByIdAsync(long id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(book => book.Id == id);
            if (book == null)
            {
                throw new EntityNotFoundException("Such book doesn't exist");
            }
            return book;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> GetAuthorByIdAsync(long id)
        {

            var author = await _context.Authors.FirstOrDefaultAsync(author => author.Id == id);
            if (author == null)
            {
                throw new EntityNotFoundException("Such author doesn't exist");
            }
            return author;
        }
    }
}
