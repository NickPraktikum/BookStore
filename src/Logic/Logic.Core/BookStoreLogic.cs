namespace devdeer.BookStore.Logic.Core
{
    using devdeer.BookStore.Data.Entities;
    using devdeer.BookStore.Logic.Common.Exceptions;
    using devdeer.BookStore.Logic.Interfaces;
    using devdeer.BookStore.Logic.Models;
    using devdeer.BookStore.Logic.Models.CreateModels;
    using devdeer.BookStore.Logic.Models.UpdateModels;

    public class BookStoreLogic : IBookStoreLogic
    {
        private readonly IBookStoreRepository _repository;
        private readonly IVersionDisplayRepository _versionRepository;
        public BookStoreLogic(IBookStoreRepository repository, IVersionDisplayRepository versionRepository)
        {
            _repository = repository;
            _versionRepository = versionRepository;
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> CreateAuthorAsync(CreateAuthorModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Surname))
            {
                throw new ArgumentException(
                    "Value cannot be null or whitespace.",
                    nameof(model.Surname));
            }
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                throw new ArgumentException(
                    "Value cannot be null or whitespace.",
                    nameof(model.Name));
            }
            return await _repository.CreateAuthorAsync(model);
        }

        /// <inheritdoc/>
        public async Task<BookModel?> CreateBookAsync(CreateBookModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Title))
            {
                throw new ArgumentException(
                    "Value cannot be null or whitespace.",
                    nameof(model.Title));
            }
            if (model.Isbn.Length > 13 | model.Isbn.Length < 10)
            {
                throw new ArgumentException(
                   "Value cannot be shorter than 10 or longer than 13.",
                   nameof(model.Isbn));
            }
            if (string.IsNullOrWhiteSpace(model.Isbn))
            {
                throw new ArgumentException(
                    "Value cannot be null or whitespace.",
                    nameof(model.Isbn));
            }
            var author = await GetAuthorByIdAsync(model.AuthorId);
            return await _repository.CreateBookAsync(model, author);
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteAuthorAsync(long id)
        {
            return await _repository.DeleteAuthorAsync(id);
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteBookAsync(long id)
        {
            return await _repository.DeleteBookAsync(id);
        }

        /// <inheritdoc/>
        public async Task<AuthorModel[]?> GetAllAvailableAuthorsAsync()
        {
            return await _repository.GetAllAvailableAuthorsAsync();
        }

        /// <inheritdoc/>
        public async Task<BookModel[]?> GetAllAvailableBooksAsync()
        {
            return await _repository.GetAllAvailableBooksAsync();
        }

        /// <inheritdoc/>
        public async Task<AuthorModel[]?> GetAllDeletedAuthorsAsync()
        {
            return await _repository.GetAllDeletedAuthorsAsync();
        }

        /// <inheritdoc/>
        public async Task<BookModel[]?> GetAllDeletedBooksAsync()
        {
            return await _repository.GetAllDeletedBooksAsync();
        }

        /// <inheritdoc/>
        public async Task<AuthorEntity> GetAuthorByIdAsync(long id)
        {
            return await _repository.GetAuthorByIdAsync(id);
        }

        /// <inheritdoc/>
        public async Task<BookEntity> GetBookByIdAsync(long id)
        {
            return await _repository.GetBookByIdAsync(id);
        }

        /// <inheritdoc/>
        public async Task<AuthorModel> UpdateAuthorAsync(long id, UpdateAuthorModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Surname))
            {
                throw new ArgumentException(
                    "Value cannot be null or whitespace.",
                    nameof(model.Surname));
            }
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                throw new ArgumentException(
                    "Value cannot be null or whitespace.",
                    nameof(model.Name));
            }
            return await _repository.UpdateAuthorAsync(id, model);
        }

        /// <inheritdoc/>
        public async Task<BookModel> UpdateBookAsync(long id, UpdateBookModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Title))
            {
                throw new ArgumentException(
                    "Value cannot be null or whitespace.",
                    nameof(model.Title));
            }
            if (model.Isbn.Length > 13 | model.Isbn.Length < 10)
            {
                throw new ArgumentException(
                   "Value cannot be shorter than 10 or longer than 13.",
                   nameof(model.Isbn));
            }
            if (string.IsNullOrWhiteSpace(model.Isbn))
            {
                throw new ArgumentException(
                    "Value cannot be null or whitespace.",
                    nameof(model.Isbn));
            }
            var author = await GetAuthorByIdAsync(model.AuthorId);
            return await _repository.UpdateBookAsync(id, model, author!);
        }
        /// <inheritdoc/>
        public async Task<AuthorModel> GetAuthorByVersionAsync(long id, int version)
        {
            return await _versionRepository.GetAuthorByVersionAsync(id, version);
        }

        /// <inheritdoc/>
        public async Task<BookModel> GetBookByVersionAsync(long id, int version)
        {
            return await _versionRepository.GetBookByVersionAsync(id, version);
        }
    }
}

