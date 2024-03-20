using WebAPI.Context;
using WebAPI.Models;

namespace WebAPI.Models
{
    public class seedData
    {

        public static void SeedData(AppDbContext context)
        {
            SeedDesarrolladores(context);
            SeedEditores(context);
            SeedGeneros(context);
            SeedUsuarios(context);
            SeedJuegos(context);
            SeedTransacciones(context);

            context.SaveChanges();
        }

        private static void SeedDesarrolladores(AppDbContext context)
        {
            var desarrolladores = new List<Desarrollador>
            {
                new Desarrollador { Nombre = "Desarrollador A" },
                new Desarrollador { Nombre = "Desarrollador B" },
                new Desarrollador { Nombre = "Desarrollador C" },
                new Desarrollador { Nombre = "Desarrollador D" },
                new Desarrollador { Nombre = "Desarrollador E" }
            };

            context.Desarrolladores.AddRange(desarrolladores);
        }

        private static void SeedEditores(AppDbContext context)
        {
            var editores = new List<Editor>
            {
                new Editor { Nombre = "Editor A" },
                new Editor { Nombre = "Editor B" },
                new Editor { Nombre = "Editor C" },
                new Editor { Nombre = "Editor D" },
                new Editor { Nombre = "Editor E" }
            };

            context.Editores.AddRange(editores);
        }

        private static void SeedGeneros(AppDbContext context)
        {
            var generos = new List<Genero>
            {
                new Genero { Titulo = "Aventura" },
                new Genero { Titulo = "Acción" },
                new Genero { Titulo = "Estrategia" },
                new Genero { Titulo = "Deportes" },
                new Genero { Titulo = "Puzzle" }
            };

            context.Generos.AddRange(generos);
        }

        private static void SeedUsuarios(AppDbContext context)
        {
            var usuarios = new List<Usuario>
            {
                new Usuario { FechaRegistro = DateTime.Now, NomApels = "Usuario 1", Saldo = 100.0m, Username = "usuario1" },
                new Usuario { FechaRegistro = DateTime.Now, NomApels = "Usuario 2", Saldo = 200.0m, Username = "usuario2" },
                new Usuario { FechaRegistro = DateTime.Now, NomApels = "Usuario 3", Saldo = 300.0m, Username = "usuario3" },
                new Usuario { FechaRegistro = DateTime.Now, NomApels = "Usuario 4", Saldo = 400.0m, Username = "usuario4" },
                new Usuario { FechaRegistro = DateTime.Now, NomApels = "Usuario 5", Saldo = 500.0m, Username = "usuario5" }
            };

            context.Usuarios.AddRange(usuarios);
        }

        private static void SeedJuegos(AppDbContext context)
        {
            var juegos = new List<Juego>
            {
                new Juego { Descripcion = "Descripción juego 1", FechaLanzamiento = DateTime.Now, Puntuacion = 8.5, Titulo = "Juego 1", IdDesarrollador = 1, IdEditor = 1 },
                new Juego { Descripcion = "Descripción juego 2", FechaLanzamiento = DateTime.Now, Puntuacion = 9.0, Titulo = "Juego 2", IdDesarrollador = 2, IdEditor = 2 },
                new Juego { Descripcion = "Descripción juego 3", FechaLanzamiento = DateTime.Now, Puntuacion = 7.8, Titulo = "Juego 3", IdDesarrollador = 3, IdEditor = 3 },
                new Juego { Descripcion = "Descripción juego 4", FechaLanzamiento = DateTime.Now, Puntuacion = 8.2, Titulo = "Juego 4", IdDesarrollador = 4, IdEditor = 4 },
                new Juego { Descripcion = "Descripción juego 5", FechaLanzamiento = DateTime.Now, Puntuacion = 9.5, Titulo = "Juego 5", IdDesarrollador = 5, IdEditor = 5 }
            };

            context.Juegos.AddRange(juegos);
        }

        private static void SeedTransacciones(AppDbContext context)
        {
            var transacciones = new List<Transaccion>
            {
                new Transaccion { FechaCompra = DateTime.Now, Importe = 50.0m, IdUsuario = 1 },
                new Transaccion { FechaCompra = DateTime.Now, Importe = 75.0m, IdUsuario = 2 },
                new Transaccion { FechaCompra = DateTime.Now, Importe = 100.0m, IdUsuario = 3 },
                new Transaccion { FechaCompra = DateTime.Now, Importe = 125.0m, IdUsuario = 4 },
                new Transaccion { FechaCompra= DateTime.Now, Importe = 150.0m, IdUsuario = 5 }
            };

            context.Transacciones.AddRange(transacciones);
        }
    }
}

