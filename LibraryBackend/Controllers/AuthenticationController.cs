using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryBackend.Models;
using LibraryBackend.Context;
using LibraryBackend.RequestModels;
using LibraryBackend.ResponseModels;
using System.Text;

namespace LibraryBackend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly LibraryContext _context;

        public AuthenticationController(LibraryContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login(LoginRequest login)
        {
            var users = await _context.Users.ToListAsync();

            var user = users.Find(user => user.Email == login.Email);   

            if (user == null || Encoding.UTF8.GetString(user.PasswordHash) != login.Password) return BadRequest("Niepoprawny emial bądź hasło");

            var role = await _context.Roles.FindAsync(user.RoleId);

            return new LoginResponse() { Id = user.Id, Email = user.Email, FirstName = user.FirstName, Lastname = user.Lastname, Role = role };
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
