using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Context;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [EnableCors(policyName: "MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class CarritosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarritosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Carritos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carrito>>> GetCarritos()
        {
            return await _context.Carritos.ToListAsync();
        }

        // GET: api/Carritos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Carrito>> GetCarrito(int id)
        {
            var carrito = await _context.Carritos.FindAsync(id);

            if (carrito == null)
            {
                return NotFound();
            }

            return carrito;
        }

        // PUT: api/Carritos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarrito(int id, Carrito carrito)
        {
            if (id != carrito.ID)
            {
                return BadRequest();
            }

            _context.Entry(carrito).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarritoExists(id))
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

        // POST: api/Carritos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Carrito>> PostCarrito(Carrito carrito)
        {
            _context.Carritos.Add(carrito);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarrito", new { id = carrito.ID }, carrito);
        }

        // DELETE: api/Carritos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarrito(int id)
        {
            var carrito = await _context.Carritos.FindAsync(id);
            if (carrito == null)
            {
                return NotFound();
            }

            _context.Carritos.Remove(carrito);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarritoExists(int id)
        {
            return _context.Carritos.Any(e => e.ID == id);
        }
    }
}
