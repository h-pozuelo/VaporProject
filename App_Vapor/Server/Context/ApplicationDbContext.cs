using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Configuration;
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

            builder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}
