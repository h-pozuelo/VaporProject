using Microsoft.EntityFrameworkCore;

namespace App_Vapor.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }


        public DbSet<Models.Juego>? Juegos { get; set; }
        public DbSet<Models.Genero>? Generos { get; set; }
        public DbSet<Models.Editor>? Editores { get; set; }
        public DbSet<Models.Desarrolladora>? Desarrolladoras { get; set; }



    }


}
