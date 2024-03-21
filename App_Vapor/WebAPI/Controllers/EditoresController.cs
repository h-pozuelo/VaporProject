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
    public class EditoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EditoresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Editores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Editor>>> GetEditores()
        {
            return await _context.Editores.ToListAsync();
        }

        // GET: api/Editores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Editor>> GetEditor(int id)
        {
            var editor = await _context.Editores.FindAsync(id);

            if (editor == null)
            {
                return NotFound();
            }

            return editor;
        }

        // PUT: api/Editores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEditor(int id, Editor editor)
        {
            if (id != editor.ID)
            {
                return BadRequest();
            }

            _context.Entry(editor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EditorExists(id))
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

        // POST: api/Editores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Editor>> PostEditor(Editor editor)
        {
            _context.Editores.Add(editor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEditor", new { id = editor.ID }, editor);
        }

        // DELETE: api/Editores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEditor(int id)
        {
            var editor = await _context.Editores.FindAsync(id);
            if (editor == null)
            {
                return NotFound();
            }

            _context.Editores.Remove(editor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EditorExists(int id)
        {
            return _context.Editores.Any(e => e.ID == id);
        }
    }
}
