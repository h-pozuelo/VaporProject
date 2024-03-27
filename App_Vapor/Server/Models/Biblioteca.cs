using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Biblioteca
    {
        [Key]
        public int ID { get; set; }
        public DateTime FechaAdicion { get; set; }
        public int IdJuego { get; set; }

        public virtual Usuario? Usuario { get; set; }
        [ForeignKey(nameof(Usuario))]
        public string? IdUsuario { get; set; }
    }
}
