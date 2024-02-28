namespace devdeer.BookStore.Logic.Mappings
{
    using AutoMapper;
    using devdeer.BookStore.Data.Entities;
    using devdeer.BookStore.Logic.Models;

    public class BookMapping : Profile
    {
        public BookMapping() {
            CreateMap<BookEntity, BookModel>();
        }
    }
}
