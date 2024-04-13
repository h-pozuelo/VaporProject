using AutoMapper;
using Server.DataTransferObjects;
using Server.Models;

namespace Server
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserForRegistrationDto, Usuario>()
                .ForMember((u) => u.NomApels, (opt) => opt.MapFrom((x) => x.FullName))
                .ForMember((u) => u.UserName, (opt) => opt.MapFrom((x) => x.Email));

            CreateMap<Usuario, FullUser_Output_DTO>();
            CreateMap<FullUser_Output_DTO, Usuario>();

            CreateMap<Usuario, UserDetailsDto>()
                .ForMember((u) => u.Id, (opt) => opt.MapFrom((x) => x.Id))
                .ForMember((u) => u.FechaRegistro, (opt) => opt.MapFrom((x) => x.FechaRegistro))
                .ForMember((u) => u.NomApels, (opt) => opt.MapFrom((x) => x.NomApels))
                .ForMember((u) => u.Saldo, (opt) => opt.MapFrom((x) => x.Saldo))
                .ForMember((u) => u.UserName, (opt) => opt.MapFrom((x) => x.UserName))
                .ForMember((u) => u.Email, (opt) => opt.MapFrom((x) => x.Email))
                .ForMember((u) => u.PhoneNumber, (opt) => opt.MapFrom((x) => x.PhoneNumber));

            CreateMap<UserDetailsDto, Usuario>()
                .ForMember((u) => u.Id, (opt) => opt.MapFrom((x) => x.Id))
                .ForMember((u) => u.FechaRegistro, (opt) => opt.MapFrom((x) => x.FechaRegistro))
                .ForMember((u) => u.NomApels, (opt) => opt.MapFrom((x) => x.NomApels))
                .ForMember((u) => u.Saldo, (opt) => opt.MapFrom((x) => x.Saldo))
                .ForMember((u) => u.UserName, (opt) => opt.MapFrom((x) => x.UserName))
                .ForMember((u) => u.NormalizedUserName, (opt) => opt.MapFrom((x) => x.UserName.ToUpper()))
                .ForMember((u) => u.Email, (opt) => opt.MapFrom((x) => x.Email))
                .ForMember((u) => u.NormalizedEmail, (opt) => opt.MapFrom((x) => x.Email.ToUpper()))
                .ForMember((u) => u.PhoneNumber, (opt) => opt.MapFrom((x) => x.PhoneNumber));
        }
    }
}
