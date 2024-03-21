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
    public class GenerosJuegosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GenerosJuegosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/GenerosJuegos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GeneroJuego>>> GetGenerosJuegos()
        {
            return await _context.GenerosJuegos.ToListAsync();
        }

        // GET: api/GenerosJuegos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GeneroJuego>> GetGeneroJuego(int id)
        {
            var generoJuego = await _context.GenerosJuegos.FindAsync(id);

            if (generoJuego == null)
            {
                return NotFound();
            }

            return generoJuego;
        }

        // PUT: api/GenerosJuegos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGeneroJuego(int id, GeneroJuego generoJuego)
        {
            if (id != generoJuego.ID)
            {
                return BadRequest();
            }

            _context.Entry(generoJuego).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GeneroJuegoExists(id))
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

        // POST: api/GenerosJuegos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GeneroJuego>> PostGeneroJuego(GeneroJuego generoJuego)
        {
            _context.GenerosJuegos.Add(generoJuego);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGeneroJuego", new { id = generoJuego.ID }, generoJuego);
        }

        // DELETE: api/GenerosJuegos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGeneroJuego(int id)
        {
            var generoJuego = await _context.GenerosJuegos.FindAsync(id);
            if (generoJuego == null)
            {
                return NotFound();
            }

            _context.GenerosJuegos.Remove(generoJuego);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GeneroJuegoExists(int id)
        {
            return _context.GenerosJuegos.Any(e => e.ID == id);
        }
    }
}
