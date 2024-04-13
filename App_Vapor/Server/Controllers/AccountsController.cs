using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.DataTransferObjects;
using Server.JwtFeatures;
using Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Server.Controllers
{
    [EnableCors(policyName: "MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtHandler _jwtHandler;
        private readonly ApplicationDbContext _context;

        public AccountsController(UserManager<Usuario> userManager, IMapper mapper, JwtHandler jwtHandler, ApplicationDbContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
            _context = context;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistrationDto)
        {
            if (userForRegistrationDto == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = _mapper.Map<Usuario>(userForRegistrationDto);

            user.FechaRegistro = DateTime.Now;

            var result = await _userManager.CreateAsync(user, userForRegistrationDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select((e) => e.Description);

                return BadRequest(new RegistrationResponseDto { Errors = errors });
            }

            return StatusCode(201);
        }




        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            Usuario? user = await _userManager.FindByEmailAsync(userForAuthentication.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
        }

        [HttpGet("GetUserData")]
        [Authorize]
        public async Task<IActionResult> GetUserById()
        {
            //var user = await _userManager.GetUserAsync(HttpContext.User);
            var userEmail = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Contains("emailaddress")).Value;
            var user = await _userManager.FindByEmailAsync(userEmail);


            if (user == null)
                return BadRequest();
            FullUser_Output_DTO userDto = _mapper.Map<FullUser_Output_DTO>(user);

            return Ok(userDto);
        }


        // GET: api/Accounts/Details
        [HttpGet("Details")]
        public async Task<IActionResult> GetUserDetails(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new UserDetailsDto()
            {
                Id = user.Id,
                FechaRegistro = user.FechaRegistro,
                NomApels = user.NomApels,
                Saldo = user.Saldo,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            });
        }

        // GET: api/Accounts/id
        [HttpGet("id")]
        public async Task<ActionResult<UserDetailsDto>> GetUsuario(string id)
        {
            var usuario = await _context.Users.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return _mapper.Map<UserDetailsDto>(usuario);
        }

        // PUT: api/Accounts/id
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("id")]
        public async Task<IActionResult> PutUsuario(string id, UserDetailsDto userDetailsDto)
        {
            if (id != userDetailsDto.Id)
            {
                return BadRequest();
            }

            Usuario mappedUser = _mapper.Map<Usuario>(userDetailsDto);

            List<string> Errors = new List<string>();

            if (await _context.Users.AnyAsync((u) => u.NormalizedUserName == mappedUser.NormalizedUserName
            && u.Id != mappedUser.Id))
            {
                Errors.Add($"Nombre de Usuario '{mappedUser.UserName}' no está disponible.");
            }

            if (await _context.Users.AnyAsync((u) => u.NormalizedEmail == mappedUser.NormalizedEmail
            && u.Id != mappedUser.Id))
            {
                Errors.Add($"Email '{mappedUser.Email}' no está disponible.");
            }

            if (Errors.Count > 0)
            {
                return BadRequest(new UserDetailsResponseDto { Errors = Errors });
            }

            var usuario = _context.Users.Find(mappedUser.Id);

            usuario.NomApels = mappedUser.NomApels;
            usuario.Saldo = mappedUser.Saldo;
            usuario.UserName = mappedUser.UserName;
            usuario.NormalizedUserName = mappedUser.NormalizedUserName;
            usuario.Email = mappedUser.Email;
            usuario.NormalizedEmail = mappedUser.NormalizedEmail;
            usuario.PhoneNumber = mappedUser.PhoneNumber;

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_context.Users.Any(e => e.Id == mappedUser.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}
