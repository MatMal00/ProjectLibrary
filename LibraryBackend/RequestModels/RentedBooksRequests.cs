using LibraryBackend.Models;

namespace LibraryBackend.RequestModels
{
    public class RentedBookPutRequests
    {
    }

    public class RentedBookPostRequests
    {
        public int BookId { get; set; }
        public int UserId { get; set; }
    }
}
