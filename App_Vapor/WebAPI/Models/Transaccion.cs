using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Transaccion
    {
        [Key]
        public int ID { get; set; }
        [Display(Name = "Fecha de Compra")]
        public DateTime? FechaCompra { get; set; }
        public decimal Importe { get; set; }

        public virtual Usuario? Usuario { get; set; }
        [ForeignKey(nameof(Usuario)), Display(Name = "Usuario")]
        public int IdUsuario { get; set; }

        [JsonIgnore]
        public virtual ICollection<JuegoTransaccion>? JuegosTransacciones { get; set; }
    }
}
