using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Resenya
    {
        [Key]
        public int ID { get; set; }
        public string? Comentario { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public int Valoracion { get; set; }
        public int IdJuego { get; set; }

        public virtual Usuario? Usuario { get; set; }
        [ForeignKey(nameof(Usuario))]
        public string? IdUsuario { get; set; }
    }
}
