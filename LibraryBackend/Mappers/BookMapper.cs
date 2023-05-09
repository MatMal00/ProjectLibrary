using LibraryBackend.Models;
using LibraryBackend.ResponseModels;

namespace LibraryBackend.Mappers
{
    static public class BookMapper
    {
        public static BookResponse ToBookResponseModel(Book book, List<Category> categories) => new()
        {
            Id = book.Id,
            Author = book.Author,
            BookDescription = book.BookDescription,
            CategoryName = categories.Find(c => c.Id == book.CategoryId)?.CategoryName ?? "",
            ImageUrl = book.ImageUrl,
            IsRentable = book.IsRentable,
            Price = book.Price,
            Quantity = book.Quantity,
            Title = book.Title,
            Rating = book?.Rating ?? "no Rating"
        };
    }
}
