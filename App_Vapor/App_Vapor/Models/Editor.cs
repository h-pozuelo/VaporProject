namespace App_Vapor.Models
{
    public class Editor : BaseEntity
    {
        public string Nombre { get; set; } = string.Empty;
        public ICollection<Desarrolladora>? Desarrolladoras { get; set; }
    }
}
