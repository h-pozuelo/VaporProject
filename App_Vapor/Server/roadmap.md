## [27/03/2024]

Instalar el paquete NuGet **`Microsoft.AspNetCore.Identity.EntityFrameworkCore`**

Instalar el paquete NuGet **`Microsoft.EntityFrameworkCore.SqlServer`**

Instalar el paquete NuGet **`Microsoft.EntityFrameworkCore.Tools`**

### Creación de los modelos

Crear el fichero **`./Models/Usuario.cs`**

Dentro de **`./Models/Usuario.cs`**

```
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Server.Models
{
    public class Usuario : IdentityUser
    {
        public DateTime FechaRegistro { get; set; }
        public string? NomApels { get; set; }
        public decimal Saldo { get; set; }

        [JsonIgnore]
        public virtual ICollection<Biblioteca>? Bibliotecas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Resenya>? Resenyas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Transaccion>? Transacciones { get; set; }
    }
}
```

Crear el fichero **`./Models/Biblioteca.cs`**

Dentro de **`./Models/Biblioteca.cs`**

```
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Biblioteca
    {
        [Key]
        public int ID { get; set; }
        public DateTime FechaAdicion { get; set; }
        public int IdJuego { get; set; }

        public virtual Usuario? Usuario { get; set; }
        [ForeignKey(nameof(Usuario))]
        public int IdUsuario { get; set; }
    }
}
```

Crear el fichero **`./Models/Resenya.cs`**

Dentro de **`./Models/Resenya.cs`**

```
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Resenya
    {
        [Key]
        public int ID { get; set; }
        public string? Comentario { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public int Valoracion { get; set; }
        public int IdJuego { get; set; }

        public virtual Usuario? Usuario { get; set; }
        [ForeignKey(nameof(Usuario))]
        public int IdUsuario { get; set; }
    }
}
```

Crear el fichero **`./Models/Transaccion.cs`**

Dentro de **`./Models/Transaccion.cs`**

```
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Models
{
    public class Transaccion
    {
        [Key]
        public int ID { get; set; }
        public DateTime FechaCompra { get; set; }
        public decimal Importe { get; set; }

        public virtual Usuario? Usuario { get; set; }
        [ForeignKey(nameof(Usuario))]
        public int IdUsuario { get; set; }

        [JsonIgnore]
        public virtual ICollection<JuegoTransaccion>? JuegosTransacciones { get; set; }
    }
}
```

Crear el fichero **`./Models/JuegoTransaccion.cs`**

Dentro de **`./Models/JuegoTransaccion.cs`**

```
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class JuegoTransaccion
    {
        [Key]
        public int ID { get; set; }
        public int IdJuego { get; set; }

        public virtual Transaccion? Transaccion { get; set; }
        [ForeignKey(nameof(Transaccion))]
        public int IdTransaccion { get; set; }
    }
}
```

### Creación del contexto de BBDD

Crear el fichero **`./Context/ApplicationDbContext.cs`**

Dentro de **`./Context/ApplicationDbContext.cs`**

```
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Context
{
    public class ApplicationDbContext : IdentityDbContext<Usuario>
    {
        public DbSet<Biblioteca> Bibliotecas { get; set; }
        public DbSet<JuegoTransaccion> JuegosTransacciones { get; set; }
        public DbSet<Resenya> Resenyas { get; set; }
        public DbSet<Transaccion> Transacciones { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
```

### Creación de la cadena de conexión

Dentro de **`./appsettings.json`**

```
{
  ...,
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=SERVER_REPOSITORY;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False"
  }
}
```

### Registro de los cambios en la aplicación

Dentro de **`./Program.cs`**

```
...
using Server.Context;
using Server.Models;
...
builder.Services.AddDbContext<ApplicationDbContext>((options) =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<Usuario, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
...
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    var db = app.Services.CreateScope().ServiceProvider.GetService<ApplicationDbContext>();
    db?.Database.EnsureCreated();
    ...
}
...
```

### Configuración de roles

Crear el fichero **`./Configuration/RoleConfiguration.cs`**

Dentro de **`./Configuration/RoleConfiguration.cs`**

```
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Server.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole
                {
                    Name = "Visitor",
                    NormalizedName = "VISITOR"
                },
                new IdentityRole
                {
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR"
                });
        }
    }
}
```

Dentro de **`./Context/ApplicationDbContext.cs`**

```
...
using Server.Configuration;
...
namespace Server.Context
{
    public class ApplicationDbContext : IdentityDbContext<Usuario>
    {
        ...
        protected override void OnModelCreating(ModelBuilder builder)
        {
            ...
            builder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}
```

### Configuración de CORS

Dentro de **`./Program.cs`**

```
...
builder.Services.AddCors((options) =>
{
    options.AddPolicy(
        name: "MyPolicy",
        (builder) =>
        {
            builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
        });
});
...
app.UseCors(policyName: "MyPolicy");
...
```

## [28/03/2024]

### Configuración del registro de usuarios

Crear el fichero **`./DataTransferObjects/UserForRegistrationDto.cs`**

Dentro de **`./DataTransferObjects/UserForRegistrationDto.cs`**

```
using System.ComponentModel.DataAnnotations;

namespace Server.DataTransferObjects
{
    public class UserForRegistrationDto
    {
        [Required(ErrorMessage = "FullName is required.")]
        public string? FullName { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; set; }
        [Compare(nameof(Password), ErrorMessage = "The password and confirmation password do not match.")]
        public string? ConfirmPassword { get; set; }
    }

    public class RegistrationResponseDto
    {
        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}
```

Instalar el paquete NuGet **`AutoMapper`**

Crear el fichero **`./Controllers/AccountsController.cs`**

Dentro de **`./Controllers/AccountsController.cs`**

```
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.DataTransferObjects;
using Server.Models;

namespace Server.Controllers
{
    [EnableCors(policyName: "MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<Usuario> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistrationDto)
        {
            if (userForRegistrationDto == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = _mapper.Map<Usuario>(userForRegistrationDto);

            var result = await _userManager.CreateAsync(user, userForRegistrationDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select((e) => e.Description);

                return BadRequest(new RegistrationResponseDto { Errors = errors });
            }

            return StatusCode(201);
        }
    }
}
```

Crear el fichero **`./MappingProfile.cs`**

Dentro de **`./MappingProfile.cs`**

```
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
        }
    }
}
```

Dentro de **`./Program.cs`**

```
...
using Server;
...
builder.Services.AddAutoMapper(typeof(MappingProfile));
...
```

Continuar en el **`client`**