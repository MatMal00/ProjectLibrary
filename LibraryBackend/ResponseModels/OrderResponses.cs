using LibraryBackend.Models;

namespace LibraryBackend.ResponseModels
{
    public class OrderResponse
    {
        public int Id { get; set; }

        public virtual OrderStatus OrderStatus { get; set; }
        public virtual BookResponse Book { get; set; }
        public virtual UserSimplifiedResponse User { get; set; }
    }
}
