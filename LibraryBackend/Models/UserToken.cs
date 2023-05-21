namespace LibraryBackend.Models
{
    public partial class UserToken
    {
        public string JWTToken { get; set; }

        public DateTime ExpirationDate { get; set; }
    }
}