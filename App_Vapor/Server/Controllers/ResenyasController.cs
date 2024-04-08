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
    public class ResenyasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResenyasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Resenyas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resenya>>> GetResenyas()
        {
            return await _context.Resenyas.ToListAsync();
        }

        // GET: api/Resenyas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resenya>> GetResenya(int id)
        {
            var resenya = await _context.Resenyas.FindAsync(id);

            if (resenya == null)
            {
                return NotFound();
            }

            return resenya;
        }

        // PUT: api/Resenyas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResenya(int id, Resenya resenya)
        {
            if (id != resenya.ID)
            {
                return BadRequest();
            }

            _context.Entry(resenya).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResenyaExists(id))
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

        // POST: api/Resenyas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Resenya>> PostResenya(Resenya resenya)
        {
            _context.Resenyas.Add(resenya);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResenya", new { id = resenya.ID }, resenya);
        }

        // DELETE: api/Resenyas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResenya(int id)
        {
            var resenya = await _context.Resenyas.FindAsync(id);
            if (resenya == null)
            {
                return NotFound();
            }

            _context.Resenyas.Remove(resenya);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResenyaExists(int id)
        {
            return _context.Resenyas.Any(e => e.ID == id);
        }
    }
}
