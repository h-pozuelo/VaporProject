using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Usuario
    {
        [Key]
        public int ID { get; set; }
        [Display(Name = "Fecha de Registro")]
        public DateTime? FechaRegistro { get; set; }
        [Display(Name = "Nombre Completo")]
        public string? NomApels { get; set; }
        public decimal Saldo { get; set; }
        [Display(Name = "Nombre de Usuario")]
        public string? Username { get; set; }

        [JsonIgnore]
        public virtual ICollection<Biblioteca>? Bibliotecas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Carrito>? Carritos { get; set; }
        [JsonIgnore]
        public virtual ICollection<Resenya>? Resenyas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Transaccion>? Transacciones { get; set; }
    }
}
