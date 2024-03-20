using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Biblioteca
    {
        [Key]
        public int ID { get; set; }
        [Display(Name = "Fecha de Adición")]
        public DateTime FechaAdicion { get; set; }

        public virtual Juego? Juego { get; set; }
        [ForeignKey(nameof(Juego)), Display(Name = "Juego")]
        public int IdJuego { get; set; }
        public virtual Usuario? Usuario { get; set; }
        [ForeignKey(nameof(Usuario)), Display(Name = "Usuario")]
        public int IdUsuario { get; set; }
    }
}
