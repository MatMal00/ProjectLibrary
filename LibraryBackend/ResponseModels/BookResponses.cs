namespace LibraryBackend.ResponseModels
{
    public class BookResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string BookDescription { get; set; }
        public string ImageUrl { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public int? Quantity { get; set; }
        public bool IsRentable { get; set; }
        public string Rating { get; set; }
    }
}
