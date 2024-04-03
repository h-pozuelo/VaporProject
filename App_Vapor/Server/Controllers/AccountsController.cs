using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public AccountsController(UserManager<Usuario> userManager, IMapper mapper, JwtHandler jwtHandler)
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistrationDto)
        {
            if (userForRegistrationDto == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = _mapper.Map<Usuario>(userForRegistrationDto);

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
    }
}
