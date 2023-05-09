using LibraryBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace LibraryBackend.RequestModels
{
    public class UserPutRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Lastname { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string RoleName { get; set; }
    }
}
