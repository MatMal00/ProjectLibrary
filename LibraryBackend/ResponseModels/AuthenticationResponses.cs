using LibraryBackend.Models;

namespace LibraryBackend.ResponseModels
{
    public class LoginResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string? AccessToken { get; set; }
        public DateTime AccessTokenExpires { get; set; }


        public virtual Role Role { get; set; }
    }
}
