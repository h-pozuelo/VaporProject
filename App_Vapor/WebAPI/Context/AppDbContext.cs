using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Context
{
    public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<Biblioteca> Bibliotecas { get; set; }
        public DbSet<Carrito> Carritos { get; set; }
        public DbSet<Desarrollador> Desarrolladores { get; set; }
        public DbSet<Editor> Editores { get; set; }
        public DbSet<Genero> Generos { get; set; }
        public DbSet<GeneroJuego> GenerosJuegos { get; set; }
        public DbSet<Juego> Juegos { get; set; }
        public DbSet<JuegoTransaccion> JuegosTransacciones { get; set; }
        public DbSet<Resenya> Resenyas { get; set; }
        public DbSet<Transaccion> Transacciones { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
