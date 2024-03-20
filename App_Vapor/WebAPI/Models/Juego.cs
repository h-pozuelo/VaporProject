using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.Models
{
    public class Juego
    {
        [Key]
        public int ID { get; set; }
        [Display(Name = "Descripción")]
        public string? Descripcion { get; set; }
        [Display(Name = "Fecha de Lanzamiento")]
        public DateTime? FechaLanzamiento { get; set; }
        public decimal Precio { get; set; }
        [Display(Name = "Puntuación")]
        public double Puntuacion { get; set; }
        [Display(Name = "Título")]
        public string? Titulo { get; set; }

        public virtual Desarrollador? Desarrollador { get; set; }
        [ForeignKey(nameof(Desarrollador)), Display(Name = "Desarrollador")]
        public int IdDesarrollador { get; set; }
        public virtual Editor? Editor { get; set; }
        [ForeignKey(nameof(Editor)), Display(Name = "Editor")]
        public int IdEditor { get; set; }

        [JsonIgnore]
        public virtual ICollection<Biblioteca>? Bibliotecas { get; set; }
        [JsonIgnore]
        public virtual ICollection<Carrito>? Carritos { get; set; }
        [JsonIgnore]
        public virtual ICollection<GeneroJuego>? GenerosJuegos { get; set; }
        [JsonIgnore]
        public virtual ICollection<JuegoTransaccion>? JuegosTransacciones { get; set; }
        [JsonIgnore]
        public virtual ICollection<Resenya>? Resenyas { get; set; }
    }
}
