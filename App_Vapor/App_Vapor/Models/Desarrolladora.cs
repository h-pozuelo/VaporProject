namespace App_Vapor.Models
{
    public class Desarrolladora : BaseEntity
    {
        public string Nombre { get; set; } = string.Empty;
        public ICollection<Juego>? Juegos { get; set; }
        public int EditorId { get; set; }
        public Editor? Editores { get; set; }
    }
}
