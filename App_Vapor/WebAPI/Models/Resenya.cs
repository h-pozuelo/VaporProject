using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Resenya
    {
        [Key]
        public int ID { get; set; }
        public string? Comentario { get; set; }
        [Display(Name = "Fecha de Publicación")]
        public DateTime? FechaPublicacion { get; set; }
        [Display(Name = "Valoración")]
        public int Valoracion { get; set; }

        public virtual Juego? Juego { get; set; }
        [ForeignKey(nameof(Juego)), Display(Name = "Juego")]
        public int IdJuego { get; set; }
        public virtual Usuario? Usuario { get; set; }
        [ForeignKey(nameof(Usuario)), Display(Name = "Usuario")]
        public int IdUsuario { get; set; }
    }
}
