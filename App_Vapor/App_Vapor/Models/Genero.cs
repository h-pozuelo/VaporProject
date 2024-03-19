namespace App_Vapor.Models
{
    public class Genero : BaseEntity
    {
        public string Nombre { get; set; } = string.Empty;
        public ICollection<Juego>? Juegos { get; set; }
    }
}
