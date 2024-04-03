using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Server.Models
{
    public class Usuario : IdentityUser
    {
        public DateTime FechaRegistro { get; set; }
        public string? NomApels { get; set; }
        public decimal Saldo { get; set; }

        [JsonIgnore]
        public virtual ICollection<Biblioteca>? Bibliotecas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Resenya>? Resenyas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Transaccion>? Transacciones { get; set; }
    }
}
