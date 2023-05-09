using LibraryBackend.Models;

namespace LibraryBackend.ResponseModels
{
    public class RentedBookResponse
    {
        public int Id { get; set; }
        public DateTime RentalDate { get; set; }
        public DateTime? DateOfReturn { get; set; }

        public virtual BookResponse Book { get; set; }
        public virtual UserSimplifiedResponse User { get; set; }
    }

    public class RentedBookByUserResponse
    {
        public int Id { get; set; }
        public DateTime RentalDate { get; set; }
        public DateTime? DateOfReturn { get; set; }

        public virtual BookResponse Book { get; set; }
    }
}
