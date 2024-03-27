using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class JuegoTransaccion
    {
        [Key]
        public int ID { get; set; }
        public int IdJuego { get; set; }

        public virtual Transaccion? Transaccion { get; set; }
        [ForeignKey(nameof(Transaccion))]
        public int IdTransaccion { get; set; }
    }
}
