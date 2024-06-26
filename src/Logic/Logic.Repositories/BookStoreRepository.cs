﻿namespace devdeer.BookStore.Logic.Repositories
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
        public async Task<BookModel?> CreateBookAsync(CreateBookModel model, AuthorEntity authorModel)
        {
            var author = await GetAuthorByIdAsync(authorModel.Id);
            var book = new BookEntity { Isbn = model.Isbn, Pages = model.Pages, AuthorId = authorModel.Id, Description = model.Description, Title = model.Title, Price = model.Price, IsDeleted = false, DeletedAt = null, Version = 1, Author = author };
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
            _context.Entry(author).State = EntityState.Modified;
            _context.Authors.Remove(author!);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteBookAsync(long id)
        {
            var bookModel = await GetBookByIdAsync(id);
            var book = _mapper.Map<BookEntity>(bookModel);
            _context.Entry(book).State = EntityState.Modified;
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
            var authorsEntities = await _context.Authors.IgnoreQueryFilters().Where((author) => author.IsDeleted == true).Include(author => author.Books).ToArrayAsync();
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
            var author = await GetAuthorByIdAsync(id);
            author!.Name = model.Name;
            author.Surname = model.Surname;
            author.BirthDate = model.BirthDate;
            await _context.SaveChangesAsync();
            var authorModel = _mapper.Map<AuthorModel>(author);
            return authorModel;
        }

        /// <inheritdoc/>
        public async Task<BookModel> UpdateBookAsync(long id, UpdateBookModel model, AuthorEntity author)
        {
            var book = await GetBookByIdAsync(id);
            book.AuthorId = model.AuthorId;
            book.Isbn = model.Isbn;
            book.Pages = model.Pages;
            book.Price = model.Price;
            book.Title = model.Title;
            book.Description = model.Description;
            await _context.SaveChangesAsync();
            var bookModel = _mapper.Map<BookModel>(book);
            return bookModel;
        }

        /// <inheritdoc/>
        public async Task<BookEntity> GetBookByIdAsync(long id)
        {
            var book = await _context.Books.Include(book => book.Author).FirstOrDefaultAsync(book => book.Id == id);
            if (book == null)
            {
                throw new EntityNotFoundException("Such book doesn't exist");
            }
            return book;
        }

        /// <inheritdoc/>
        public async Task<AuthorEntity> GetAuthorByIdAsync(long id)
        {

            var author = await _context.Authors.Include(a => a.Books).FirstOrDefaultAsync(author => author.Id == id);
            if (author == null)
            {
                throw new EntityNotFoundException("Such author doesn't exist");
            }
            return author;
        }
    }
}
