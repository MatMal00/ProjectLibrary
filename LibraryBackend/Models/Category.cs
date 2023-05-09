using System.ComponentModel.DataAnnotations;
namespace LibraryBackend.Models
{
    public partial class Category
    {
        public int Id { get; set; }
        [Required]
        public string CategoryName { get; set; }
    }
}