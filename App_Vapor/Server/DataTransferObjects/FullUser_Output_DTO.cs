using Server.Models;
using System.Text.Json.Serialization;

namespace Server.DataTransferObjects
{
    public class FullUser_Output_DTO
    {
        public DateTime FechaRegistro { get; set; }
        public string? NomApels { get; set; }
        public decimal Saldo { get; set; }
        public string? Email { get; set; }

        
        public List<Biblioteca>? Bibliotecas { get; set; }
        
        public List<Resenya>? Resenyas { get; set; }
        
        public List<Transaccion>? Transacciones { get; set; }
    }
}
