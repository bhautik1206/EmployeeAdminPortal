using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/salaryhistory")]
    [ApiController]
    public class SalaryHistoryController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public SalaryHistoryController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Route("employee/{employeeId:guid}")]
        public IActionResult GetForEmployee(Guid employeeId)
        {
            var history = dbContext.SalaryHistories
                .Where(s => s.EmployeeId == employeeId)
                .OrderByDescending(s => s.EffectiveFrom)
                .ToList();
            return Ok(history);
        }

        [HttpGet]
        [Route("employee/{employeeId:guid}/current")]
        public IActionResult GetCurrent(Guid employeeId)
        {
            var current = dbContext.SalaryHistories
                .Where(s => s.EmployeeId == employeeId)
                .OrderByDescending(s => s.EffectiveFrom)
                .FirstOrDefault();

            if (current is null)
            {
                return NotFound();
            }
            return Ok(current);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Add(AddSalaryHistoryDto dto)
        {
            var employeeExists = dbContext.Employees.Any(e => e.Id == dto.EmployeeId);
            if (!employeeExists)
            {
                return NotFound("Employee not found");
            }

            var salaryHistory = new SalaryHistory
            {
                EmployeeId = dto.EmployeeId,
                Amount = dto.Amount,
                EffectiveFrom = dto.EffectiveFrom,
                Reason = dto.Reason,
            };

            dbContext.SalaryHistories.Add(salaryHistory);
            dbContext.SaveChanges();
            return Ok(salaryHistory);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var entry = dbContext.SalaryHistories.Find(id);
            if (entry is null)
            {
                return NotFound();
            }
            dbContext.SalaryHistories.Remove(entry);
            dbContext.SaveChanges();
            return Ok("Delete SuccessFully");
        }
    }
}
