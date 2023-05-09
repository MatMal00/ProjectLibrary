using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryBackend.Context;
using LibraryBackend.Models;
using LibraryBackend.Mappers;
using LibraryBackend.ResponseModels;
using LibraryBackend.RequestModels;

namespace LibraryBackend.Controllers
{
    [Route("api/rented")]
    [ApiController]
    public class RentedBooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public RentedBooksController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/rented/bookId/5
        [HttpGet("rentId/{id}")]
        public async Task<ActionResult<RentedBookResponse>> GetRentedBook(int id)
        {
            var rentedBook = await _context.RentedBooks.FindAsync(id);

            if (rentedBook == null) return NotFound("Rented book not found");

            var user = await _context.Users.FindAsync(rentedBook.UserId);
            var book = await _context.Books.FindAsync(id);
            var categories = await _context.Categories.ToListAsync();

            if (book == null)
            {
                return NotFound("Book not found");
            }
            else if (user == null)
            {
                return NotFound("No user data for this request");
            }

            return new RentedBookResponse()
            {
                Id = id,
                RentalDate = new DateTime().Date,
                DateOfReturn = null,
                Book = BookMapper.ToBookResponseModel(book, categories),
                User = new() { Id = user.Id, Email = user.Email, FirstName = user.FirstName, Lastname = user.Lastname },
            };
        }

        // GET: api/rented/userId/5
        [HttpGet("userId/{id}")]
        public async Task<ActionResult<IEnumerable<RentedBookByUserResponse>>> GetRentedBooksByUserId(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            var rentedBooks = await _context.RentedBooks.ToListAsync();
            var categories = await _context.Categories.ToListAsync();
            var books = await _context.Books.ToListAsync();

            var userRentedBooks = rentedBooks.Select(rented => new RentedBookByUserResponse()
            {
                Id = rented.Id,
                RentalDate = rented.RentalDate,
                DateOfReturn = rented.DateOfReturn,
                Book = BookMapper.ToBookResponseModel(books.Find(book => book.Id == rented.BookId), categories),
            }).ToList();

            return userRentedBooks;
        }

        // PUT: api/RentedBooks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("return/{id}")]
        public async Task<IActionResult> ReturnBook(int id)
        {
            var rented = await _context.RentedBooks.FindAsync(id);

            if (rented == null)
            {
                return BadRequest();
            }
            var book = await _context.Books.FindAsync(id);

            book.Quantity += 1;
            rented.DateOfReturn = DateTime.Now;

            _context.Books.Update(book);
            _context.Entry(rented).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentedBookExists(id))
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

        // POST: api/RentedBooks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostRentedBook(OrderPostRequest rentedBook)
        {
            var user = await _context.Users.FindAsync(rentedBook.UserId);
            var book = await _context.Books.FindAsync(rentedBook.BookId);

            if (book == null || user == null) return BadRequest("Not found");

            if (book.IsRentable == false) return BadRequest("Tej książki nie można wypożyczyć");


            _context.RentedBooks.Add(new RentedBook() { BookId = rentedBook.BookId, UserId = rentedBook.UserId, RentalDate = DateTime.Now });
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentedBookExists(int id)
        {
            return _context.RentedBooks.Any(e => e.Id == id);
        }
    }
}
