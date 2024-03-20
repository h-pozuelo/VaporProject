using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Genero
    {
        [Key]
        public int ID { get; set; }
        [Display(Name = "Título")]
        public string? Titulo { get; set; }

        [JsonIgnore]
        public virtual ICollection<GeneroJuego>? GenerosJuegos { get; set; }
    }
}
