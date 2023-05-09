using System.ComponentModel.DataAnnotations;

namespace LibraryBackend.RequestModels
{
    public class BookPutRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string CategoryName { get; set; }
        public int? Quantity { get; set; }
    }
}
