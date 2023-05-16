using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryBackend.Models;
using LibraryBackend.Context;
using LibraryBackend.RequestModels;
using LibraryBackend.ResponseModels;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace LibraryBackend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly LibraryContext _context;
        IConfiguration _configuration;

        public AuthenticationController(LibraryContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginRequest login)
        {
            var users = await _context.Users.ToListAsync();

            var user = users.Find(user => user.Email == login.Email);   

            if (user == null || Encoding.UTF8.GetString(user.PasswordHash) != login.Password) return BadRequest("Niepoprawny emial bądź hasło");

            var role = await _context.Roles.FindAsync(user.RoleId);


            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("UserName", user.FirstName + " " + user.Lastname),
                        new Claim("Email", user.Email)
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: signIn);

            var userToken = new JwtSecurityTokenHandler().WriteToken(token);

            return new LoginResponse() { Id = user.Id, Email = user.Email, FirstName = user.FirstName, Lastname = user.Lastname, Role = role, AccessToken = userToken, AccessTokenExpires = DateTime.Now.AddMinutes(10) };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterRequest register)
        {

            _context.Users.Add(new User() { FirstName = register.FirstName, Lastname = register.Lastname, Email = register.Email, RoleId = 1, PasswordHash = Encoding.UTF8.GetBytes(register.Password) });
            await _context.SaveChangesAsync();

            return new EmptyResult();
        }

        [HttpPost("register/admin")]
        public async Task<ActionResult> RegisterAdmin(RegisterRequest register)
        {

            _context.Users.Add(new User() { FirstName = register.FirstName, Lastname = register.Lastname, Email = register.Email, RoleId = 2, PasswordHash = Encoding.UTF8.GetBytes(register.Password) });
            await _context.SaveChangesAsync();

            return new EmptyResult();
        }

        // DELETE: api/Authentication/5
        [HttpDelete("user/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
