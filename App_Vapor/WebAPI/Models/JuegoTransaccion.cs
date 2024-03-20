using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class JuegoTransaccion
    {
        [Key]
        public int ID { get; set; }

        public virtual Juego? Juego { get; set; }
        [ForeignKey(nameof(Juego)), Display(Name = "Juego")]
        public int IdJuego { get; set; }
        public virtual Transaccion? Transaccion { get; set; }
        [ForeignKey(nameof(Transaccion)), Display(Name = "Transacción")]
        public int IdTransaccion { get; set; }
    }
}
