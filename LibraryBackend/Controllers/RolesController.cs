using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryBackend.Context;
using LibraryBackend.Models;
using Microsoft.Win32;

namespace LibraryBackend.Controllers
{
    [Route("api/role")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly LibraryContext _context;

        public RolesController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Role>>> CreateRole(Role role)
        {
            _context.Roles.Add(new Role() { RoleName = role.RoleName });
            await _context.SaveChangesAsync();

            return new EmptyResult();
        }

        private bool RoleExists(int id)
        {
            return _context.Roles.Any(e => e.Id == id);
        }
    }
}
