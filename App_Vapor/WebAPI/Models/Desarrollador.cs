using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Desarrollador
    {
        [Key]
        public int ID { get; set; }
        public string? Nombre { get; set; }

        [JsonIgnore]
        public virtual ICollection<Juego>? Juegos { get; set; }
    }
}
