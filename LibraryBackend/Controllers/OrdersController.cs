using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryBackend.Context;
using LibraryBackend.Models;
using LibraryBackend.ResponseModels;
using LibraryBackend.RequestModels;
using LibraryBackend.Mappers;

namespace LibraryBackend.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly LibraryContext _context;

        public OrdersController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderResponse>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            var book = await _context.Books.FindAsync(order.BookId);
            var user = await _context.Users.FindAsync(order.UserId);
            var orderStatus = await _context.OrderStatuses.FindAsync(order.OrderStatusId);
            var categories = await _context.Categories.ToListAsync();

            return new OrderResponse()
            {
                Id = id,
                Book = BookMapper.ToBookResponseModel(book, categories),
                User = new UserSimplifiedResponse()
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    Lastname = user.Lastname    
                },
                OrderStatus = orderStatus
            };
        }

        // GET: api/user/5
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<OrderResponse>>> GetOrderByUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            var orders = await _context.Orders.ToListAsync();
            var userOrders = orders.FindAll(x => x.UserId == id);

            var categories = await _context.Categories.ToListAsync();
            var books = await _context.Books.ToListAsync();
            var statuses = await _context.OrderStatuses.ToListAsync();

            return userOrders.Select(order => new OrderResponse()
            {
                Id = order.Id,
                Book = BookMapper.ToBookResponseModel(books.Find(book => 1 == order.Id), categories),
                User = new UserSimplifiedResponse()
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    Lastname = user.Lastname
                },
                OrderStatus = statuses.Find(status => status.Id == order.OrderStatusId)
            }).ToList();
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, OrderPutRequest order)
        {
            var orderDb = await _context.Orders.FindAsync(id);

            if (orderDb == null)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return new EmptyResult();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderPostRequest order)
        {
            var book = await _context.Books.FindAsync(order.BookId);
            var user = await _context.Books.FindAsync(order.UserId);


            if (book == null || book.Quantity < 1 || user == null)
            {
                return BadRequest("There is no more books like this");
            }

            book.Quantity -= 1;

            _context.Orders.Add(new Order() { BookId = order.BookId, OrderStatusId = 3, UserId = order.UserId });
            _context.Books.Update(book);

            await _context.SaveChangesAsync();

            return new EmptyResult();
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
