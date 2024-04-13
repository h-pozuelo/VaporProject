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
    public class TransaccionesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransaccionesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Transacciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaccion>>> GetTransacciones()
        {
            return await _context.Transacciones.ToListAsync();
        }

        // GET: api/Transacciones/idUsuario
        [HttpGet("idUsuario")]
        public async Task<ActionResult<IEnumerable<Transaccion>>> GetTransacciones(string idUsuario)
        {
            var transacciones = await _context.Transacciones
                .Where(transaccion => transaccion.IdUsuario == idUsuario)
                .OrderByDescending(transaccion => transaccion.FechaCompra)
                .ToListAsync();

            if (transacciones == null || !(transacciones.Count > 0))
            {
                return NotFound();
            }

            return transacciones;
        }

        // GET: api/Transacciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaccion>> GetTransaccion(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);

            if (transaccion == null)
            {
                return NotFound();
            }

            return transaccion;
        }

        // PUT: api/Transacciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaccion(int id, Transaccion transaccion)
        {
            if (id != transaccion.ID)
            {
                return BadRequest();
            }

            _context.Entry(transaccion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransaccionExists(id))
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

        // POST: api/Transacciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Transaccion>> PostTransaccion(Transaccion transaccion)
        {
            _context.Transacciones.Add(transaccion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaccion", new { id = transaccion.ID }, transaccion);
        }

        // POST: api/Transacciones/appidList
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("appidList")]
        public async Task<ActionResult<Transaccion>> PostTransaccion(Transaccion transaccion, string appidList)
        {
            // Primero creamos la transacción para poder trabajar con su ID posteriormente
            _context.Transacciones.Add(transaccion);
            await _context.SaveChangesAsync();

            // Guardamos en una variable el idUsuario para poder trabajar con el posteriormente
            string idUsuario = transaccion.IdUsuario;

            List<int> lista = appidList.Split(',').Select(Int32.Parse).ToList();

            // Por cada appid que contiene la lista appidList recibida como parámetro se crea un juegoTransacción
            foreach (int appid in lista)
            {
                _context.JuegosTransacciones.Add(new JuegoTransaccion() { IdJuego = appid, IdTransaccion = transaccion.ID });
                await _context.SaveChangesAsync();

                // Debemos de crear registros en la entidad Bibliotecas para dicho usuario
                _context.Bibliotecas.Add(new Biblioteca() { FechaAdicion = transaccion.FechaCompra, IdJuego = appid, IdUsuario = idUsuario });
                await _context.SaveChangesAsync();
            }

            // Debemos de restar del saldo del usuario el importe total
            Usuario usuario = await _context.Users.FindAsync(idUsuario);
            usuario.Saldo -= transaccion.Importe;
            _context.Users.Update(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaccion", new { id = transaccion.ID }, transaccion);
        }

        // DELETE: api/Transacciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaccion(int id)
        {
            var transaccion = await _context.Transacciones.FindAsync(id);
            if (transaccion == null)
            {
                return NotFound();
            }

            _context.Transacciones.Remove(transaccion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransaccionExists(int id)
        {
            return _context.Transacciones.Any(e => e.ID == id);
        }
    }
}
