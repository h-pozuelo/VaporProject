namespace App_Vapor.Models
{
    public class Juego : BaseEntity
    {
        public string Nombre { get; set; } = string.Empty;
        public ICollection<Genero>? Generos { get; set; }
        public int DesarrolladoraId { get; set; }
        public Desarrolladora? Desarrolladora { get; set; }
    }
}
