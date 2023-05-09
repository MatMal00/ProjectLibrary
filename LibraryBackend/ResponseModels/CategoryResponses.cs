using LibraryBackend.Models;

namespace LibraryBackend.ResponseModels
{
    public class FilledCategoryResponse
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public virtual ICollection<Book>? Books { get; set; }
    }
}
