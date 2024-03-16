namespace devdeer.BookStore.Logic.Repositories
{
    using AutoMapper;
    using devdeer.BookStore.Data.Contexts.v1;
    using devdeer.BookStore.Data.Entities;
    using devdeer.BookStore.Logic.Common.Exceptions;
    using devdeer.BookStore.Logic.Interfaces;
    using devdeer.BookStore.Logic.Models;
    using devdeer.BookStore.Logic.Models.CreateModels;
    using devdeer.BookStore.Logic.Models.UpdateModels;
    using Microsoft.EntityFrameworkCore;

    public class BookStoreRepository : IBookStoreRepository
    {
        private readonly BookStoreContext _context;
        private readonly IMapper _mapper;
        public BookStoreRepository(BookStoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> CreateAuthorAsync(CreateAuthorModel model)
        {
            var authorModel = new AuthorModel { Name = model.Name, Surname = model.Surname, BirthDate = model.BirthDate, Books = new List<BookModel>(), DeletedAt = null, IsDeleted = false, Version = 1 };
            var author = _mapper.Map<AuthorEntity>(authorModel);
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();
            authorModel.Id = author.Id;
            return authorModel;
        }

        /// <inheritdoc/>
        public async Task<BookModel?> CreateBookAsync(CreateBookModel model, AuthorModel authorModel)
        {
            var book = new BookEntity { Isbn = model.Isbn, Pages = model.Pages, AuthorId = authorModel.Id, Description = model.Description, Title = model.Title, Price = model.Price, IsDeleted = false, DeletedAt = null, Version = 1 };
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            var bookModel = _mapper.Map<BookModel>(book);
            return bookModel;
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteAuthorAsync(long id)
        {
            var authorModel = await GetAuthorByIdAsync(id);
            var author = _mapper.Map<AuthorEntity>(authorModel);
            _context.Authors.Remove(author!);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteBookAsync(long id)
        {
            var bookModel = await GetBookByIdAsync(id);
            var book = _mapper.Map<BookEntity>(bookModel);
            _context.Books.Remove(book!);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel[]?> GetAllAvailableAuthorsAsync()
        {
            var authorEntities = await _context.Authors.ToArrayAsync();
            var authorModels = _mapper.Map<AuthorModel[]>(authorEntities);
            return authorModels;
        }

        /// <inheritdoc/>
        public async Task<BookModel[]?> GetAllAvailableBooksAsync()
        {
            var bookEntities = await _context.Books.ToArrayAsync();
            var bookModels = _mapper.Map<BookModel[]>(bookEntities);
            return bookModels;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel[]?> GetAllDeletedAuthorsAsync()
        {
            var authorsEntities = await _context.Authors.IgnoreQueryFilters().Where((author) => author.IsDeleted == true).ToArrayAsync();
            var authorModels = _mapper.Map<AuthorModel[]>(authorsEntities);
            return authorModels;
        }

        /// <inheritdoc/>
        public async Task<BookModel[]?> GetAllDeletedBooksAsync()
        {
            var booksEntities = await _context.Books.IgnoreQueryFilters().Where((book) => book.IsDeleted == true).ToArrayAsync();
            var bookModels = _mapper.Map<BookModel[]>(booksEntities);
            return bookModels;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> UpdateAuthorAsync(long id, UpdateAuthorModel model)
        {
            var author = await _context.Authors.FirstOrDefaultAsync(author => author.Id == id);
            author!.Name = model.Name;
            author.Surname = model.Surname;
            author.BirthDate = model.BirthDate;
            await _context.SaveChangesAsync();
            AuthorModel authorModel = null;
            return authorModel;
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
            var bookModel = _mapper.Map<BookModel>(book);
            return bookModel;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> GetAuthorByIdAsync(long id)
        {

            var author = await _context.Authors.FirstOrDefaultAsync(author => author.Id == id);
            if (author == null)
            {
                throw new EntityNotFoundException("Such author doesn't exist");
            }
            var authorModel = _mapper.Map<AuthorModel>(author);
            return authorModel;
        }
    }
}
