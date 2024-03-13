namespace devdeer.BookStore.Logic.Mappings
{
    using AutoMapper;
    using devdeer.BookStore.Data.Entities;
    using devdeer.BookStore.Logic.Models;
    public class AuthorMapping : Profile
    {
        public AuthorMapping() {
            CreateMap<AuthorEntity, AuthorModel>().ForMember(dest => dest.Books, opt => opt.MapFrom(src => src.Books)).ReverseMap();
        }
    }
}
