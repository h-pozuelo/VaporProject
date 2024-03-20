using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class GeneroJuego
    {
        [Key]
        public int ID { get; set; }

        public virtual Genero? Genero { get; set; }
        [ForeignKey(nameof(Genero)), Display(Name = "Género")]
        public int IdGenero { get; set; }
        public virtual Juego? Juego { get; set; }
        [ForeignKey(nameof(Juego)), Display(Name = "Juego")]
        public int IdJuego { get; set; }
    }
}
