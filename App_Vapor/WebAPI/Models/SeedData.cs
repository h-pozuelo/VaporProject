using Microsoft.EntityFrameworkCore;
using WebAPI.Context;

namespace WebAPI.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AppDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<AppDbContext>>()))
            {
                if (context == null ||
                    context.Bibliotecas == null ||
                    context.Carritos == null ||
                    context.Desarrolladores == null ||
                    context.Editores == null ||
                    context.Generos == null ||
                    context.GenerosJuegos == null ||
                    context.Juegos == null ||
                    context.JuegosTransacciones == null ||
                    context.Resenyas == null ||
                    context.Transacciones == null ||
                    context.Usuarios == null)
                {
                    throw new ArgumentNullException("Null AppDbContext");
                }

                if (!context.Desarrolladores.Any())
                {
                    context.Desarrolladores.AddRange(
                        new Desarrollador() { Nombre = "Arrowhead Game Studios" },
                        new Desarrollador() { Nombre = "Mike Klubnika" },
                        new Desarrollador() { Nombre = "troy_en" }
                        );
                    context.SaveChanges();
                }

                if (!context.Editores.Any())
                {
                    context.Editores.AddRange(
                        new Editor() { Nombre = "Sony Interactive Entertainment" },
                        new Editor() { Nombre = "Critical Reflex" },
                        new Editor() { Nombre = "troy_en" }
                        );
                    context.SaveChanges();
                }

                if (!context.Generos.Any())
                {
                    context.Generos.AddRange(
                        new Genero() { Titulo = "Shooter" },
                        new Genero() { Titulo = "Tactical" },
                        new Genero() { Titulo = "Indie" },
                        new Genero() { Titulo = "Simulator" },
                        new Genero() { Titulo = "Visual Novel" }
                        );
                    context.SaveChanges();
                }

                if (!context.Juegos.Any())
                {
                    context.Juegos.AddRange(
                        new Juego() { Descripcion = "The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.", FechaLanzamiento = DateTime.Parse("08/02/2024"), Imagen = "https://images.igdb.com/igdb/image/upload/t_cover_big/co741o.png", Puntuacion = 0, Titulo = "Helldivers 2", IdDesarrollador = 1, IdEditor = 1 },
                        new Juego() { Descripcion = "Buckshot Roulette is a tabletop horror game that attempts to re-design the infamous game of Russian Roulette, replacing the traditional revolver with a proper 12-gauge pump-action shotgun. This extra firepower, and more importantly the different mechanics in handling a shotgun compared to a revolver, offers a fresh take on the classic and deadly game of chance.\r\n\r\nThe game takes place at the top of an underground nightclub, where the metal railings tremble to the pulse of long lost drum machines. A crooked AI dealer is waiting for you. Will you meet them?", FechaLanzamiento = DateTime.Parse("04/04/2024"), Imagen = "https://images.igdb.com/igdb/image/upload/t_cover_big/co7sfl.png", Puntuacion = 0, Titulo = "Buckshot Roulette", IdDesarrollador = 2, IdEditor = 2 },
                        new Juego() { Descripcion = "KinitoPet is a psychological horror experience that takes place through Kinito, an early 2000s virtual assistant. Kinito is able to walk, talk, browse, adapt, and play games as Kinito is like no other with its adaptive technology!", FechaLanzamiento = DateTime.Parse("09/01/2024"), Imagen = "https://images.igdb.com/igdb/image/upload/t_cover_big/co7mgx.png", Puntuacion = 0, Titulo = "KinitoPet", IdDesarrollador = 3, IdEditor = 3 }
                        );
                    context.SaveChanges();
                }

                if (!context.GenerosJuegos.Any())
                {
                    context.GenerosJuegos.AddRange(
                        new GeneroJuego() { IdGenero = 1, IdJuego = 1 },
                        new GeneroJuego() { IdGenero = 2, IdJuego = 1 },
                        new GeneroJuego() { IdGenero = 3, IdJuego = 2 },
                        new GeneroJuego() { IdGenero = 4, IdJuego = 2 },
                        new GeneroJuego() { IdGenero = 3, IdJuego = 3 },
                        new GeneroJuego() { IdGenero = 4, IdJuego = 3 },
                        new GeneroJuego() { IdGenero = 5, IdJuego = 3 }
                        );
                    context.SaveChanges();
                }

                //if (!context.Usuarios.Any())
                //{
                //    context.Usuarios.AddRange(
                //        new Usuario() { FechaRegistro = DateTime.Parse(""), NomApels = "", Saldo = 0, Username = "" }
                //        );
                //    context.SaveChanges();
                //}

                //if (!context.Bibliotecas.Any())
                //{
                //    context.Bibliotecas.AddRange(
                //        new Biblioteca() { FechaAdicion = DateTime.Parse(""), IdJuego = 0, IdUsuario = 0 }
                //        );
                //    context.SaveChanges();
                //}

                //if (!context.Carritos.Any())
                //{
                //    context.Carritos.AddRange(
                //        new Carrito() { FechaAdicion = DateTime.Parse(""), IdJuego = 0, IdUsuario = 0 }
                //        );
                //    context.SaveChanges();
                //}

                //if (!context.Transacciones.Any())
                //{
                //    context.Transacciones.AddRange(
                //        new Transaccion() { FechaCompra = DateTime.Parse(""), Importe = 0, IdUsuario = 0 }
                //        );
                //    context.SaveChanges();
                //}

                //if (!context.JuegosTransacciones.Any())
                //{
                //    context.JuegosTransacciones.AddRange(
                //        new JuegoTransaccion() { IdJuego = 0, IdTransaccion = 0 }
                //        );
                //    context.SaveChanges();
                //}

                //if (!context.Resenyas.Any())
                //{
                //    context.Resenyas.AddRange(
                //        new Resenya() { Comentario = "", FechaPublicacion = DateTime.Parse(""), Valoracion = 0, IdJuego = 0, IdUsuario = 0 }
                //        );
                //    context.SaveChanges();
                //}
            }
        }
    }
}
