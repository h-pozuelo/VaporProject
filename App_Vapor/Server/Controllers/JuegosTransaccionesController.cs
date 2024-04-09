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
    public class JuegosTransaccionesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JuegosTransaccionesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/JuegosTransacciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JuegoTransaccion>>> GetJuegosTransacciones()
        {
            return await _context.JuegosTransacciones.ToListAsync();
        }

        // GET: api/JuegosTransacciones/idTransaccion
        [HttpGet("idTransaccion")]
        public async Task<ActionResult<IEnumerable<JuegoTransaccion>>> GetJuegosTransacciones(int idTransaccion)
        {
            var juegosTransacciones = await _context.JuegosTransacciones
                .Where(juegoTransaccion => juegoTransaccion.IdTransaccion == idTransaccion)
                .ToListAsync();

            if (juegosTransacciones == null || !(juegosTransacciones.Count > 0))
            {
                return NotFound();
            }

            return juegosTransacciones;
        }

        // GET: api/JuegosTransacciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JuegoTransaccion>> GetJuegoTransaccion(int id)
        {
            var juegoTransaccion = await _context.JuegosTransacciones.FindAsync(id);

            if (juegoTransaccion == null)
            {
                return NotFound();
            }

            return juegoTransaccion;
        }

        // PUT: api/JuegosTransacciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJuegoTransaccion(int id, JuegoTransaccion juegoTransaccion)
        {
            if (id != juegoTransaccion.ID)
            {
                return BadRequest();
            }

            _context.Entry(juegoTransaccion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JuegoTransaccionExists(id))
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

        // POST: api/JuegosTransacciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JuegoTransaccion>> PostJuegoTransaccion(JuegoTransaccion juegoTransaccion)
        {
            _context.JuegosTransacciones.Add(juegoTransaccion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJuegoTransaccion", new { id = juegoTransaccion.ID }, juegoTransaccion);
        }

        // DELETE: api/JuegosTransacciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJuegoTransaccion(int id)
        {
            var juegoTransaccion = await _context.JuegosTransacciones.FindAsync(id);
            if (juegoTransaccion == null)
            {
                return NotFound();
            }

            _context.JuegosTransacciones.Remove(juegoTransaccion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JuegoTransaccionExists(int id)
        {
            return _context.JuegosTransacciones.Any(e => e.ID == id);
        }
    }
}
