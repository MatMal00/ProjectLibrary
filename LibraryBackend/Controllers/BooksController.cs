using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryBackend.Models;
using LibraryBackend.Context;
using LibraryBackend.ResponseModels;
using LibraryBackend.Mappers;
using LibraryBackend.RequestModels;

namespace LibraryBackend.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookResponse>>> GetBooks()
        {
            var books = await _context.Books.ToListAsync();
            var categories = await _context.Categories.ToListAsync();

            return books.Select(b => BookMapper.ToBookResponseModel(b, categories)).ToList();
        }

        // GET: api/books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookResponse>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            var categories = await _context.Categories.ToListAsync();


            return BookMapper.ToBookResponseModel(book, categories);
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, BookPutRequest book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }
            var bookFromDb = await _context.Books.FindAsync(book.Id);
            var categories = await _context.Categories.ToListAsync();

            bookFromDb.Title = book.Title;
            bookFromDb.Author = book.Author;
            bookFromDb.Quantity = book.Quantity;
            bookFromDb.CategoryId = categories.Find(category => category.CategoryName == book.CategoryName).Id;

            _context.Entry(bookFromDb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            var orders = await _context.Orders.ToListAsync();
            var rented = await _context.RentedBooks.ToListAsync();
            var bestSellers = await _context.Bestsellers.ToListAsync();

            orders.ForEach(o =>
            {
                if (o.BookId == id)
                    _context.Orders.Remove(o);
            });
            rented.ForEach(r =>
            {
                if (r.BookId == id)
                    _context.RentedBooks.Remove(r);
            });
           bestSellers.ForEach(b =>
            {
                if (b.BookId == id)
                    _context.Bestsellers.Remove(b);
            });
            await _context.SaveChangesAsync();

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }


}
