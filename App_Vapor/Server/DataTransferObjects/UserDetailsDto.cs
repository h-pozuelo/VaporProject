namespace Server.DataTransferObjects
{
    public class UserDetailsDto
    {
        public string? Id { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string? NomApels { get; set; }
        public decimal Saldo { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }

    public class UserDetailsResponseDto
    {
        public IEnumerable<string>? Errors { get; set; }
    }
}
