using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.Models;

namespace Server.Controllers
{
    [EnableCors(policyName: "MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class BibliotecasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BibliotecasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Bibliotecas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Biblioteca>>> GetBibliotecas()
        {
            return await _context.Bibliotecas.ToListAsync();
        }

        // GET: api/Bibliotecas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Biblioteca>> GetBiblioteca(int id)
        {
            var biblioteca = await _context.Bibliotecas.FindAsync(id);

            if (biblioteca == null)
            {
                return NotFound();
            }

            return biblioteca;
        }


        // GET: api/Bibliotecas/id
        [HttpGet("GetBibliotecaByUserId")]
        public async Task<ActionResult<IEnumerable<Biblioteca>>> GetBibliotecaByUserId(string id)
        {
            var biblioteca = await _context.Bibliotecas
                .Where(b => b.IdUsuario == id)
                .ToListAsync();

            if (biblioteca == null || biblioteca.Count == 0)
            {
                return NotFound();
            }

            return biblioteca;
        }

        // PUT: api/Bibliotecas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBiblioteca(int id, Biblioteca biblioteca)
        {
            if (id != biblioteca.ID)
            {
                return BadRequest();
            }

            _context.Entry(biblioteca).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BibliotecaExists(id))
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

        // POST: api/Bibliotecas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Biblioteca>> PostBiblioteca(Biblioteca biblioteca)
        {
            _context.Bibliotecas.Add(biblioteca);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBiblioteca", new { id = biblioteca.ID }, biblioteca);
        }

        // DELETE: api/Bibliotecas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBiblioteca(int id)
        {
            var biblioteca = await _context.Bibliotecas.FindAsync(id);
            if (biblioteca == null)
            {
                return NotFound();
            }

            _context.Bibliotecas.Remove(biblioteca);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BibliotecaExists(int id)
        {
            return _context.Bibliotecas.Any(e => e.ID == id);
        }
    }
}
