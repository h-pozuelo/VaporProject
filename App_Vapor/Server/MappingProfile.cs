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
        }
    }
}
