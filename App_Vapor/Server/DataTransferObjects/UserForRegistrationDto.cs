using System.ComponentModel.DataAnnotations;

namespace Server.DataTransferObjects
{
    public class UserForRegistrationDto
    {
        [Required(ErrorMessage = "FullName is required.")]
        public string? FullName { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; set; }
        [Compare(nameof(Password), ErrorMessage = "The password and confirmation password do not match.")]
        public string? ConfirmPassword { get; set; }
    }

    public class RegistrationResponseDto
    {
        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}
