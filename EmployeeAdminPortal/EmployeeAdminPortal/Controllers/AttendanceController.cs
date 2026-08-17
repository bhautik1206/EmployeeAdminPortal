using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/attendance")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public AttendanceController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Route("employee/{employeeId:guid}")]
        public IActionResult GetForEmployee(Guid employeeId)
        {
            var records = dbContext.Attendances
                .Where(a => a.EmployeeId == employeeId)
                .OrderByDescending(a => a.Date)
                .ToList();
            return Ok(records);
        }

        [HttpPost]
        [Authorize]
        public IActionResult CheckIn(AddAttendanceDto dto)
        {
            var employeeExists = dbContext.Employees.Any(e => e.Id == dto.EmployeeId);
            if (!employeeExists)
            {
                return NotFound("Employee not found");
            }

            var attendance = new Attendance
            {
                EmployeeId = dto.EmployeeId,
                Date = dto.Date,
                CheckIn = dto.CheckIn ?? DateTime.UtcNow,
            };

            dbContext.Attendances.Add(attendance);
            dbContext.SaveChanges();
            return Ok(attendance);
        }

        [HttpPut]
        [Route("{id:guid}")]
        [Authorize]
        public IActionResult CheckOut(Guid id, UpdateAttendanceDto dto)
        {
            var attendance = dbContext.Attendances.Find(id);
            if (attendance is null)
            {
                return NotFound();
            }

            attendance.CheckOut = dto.CheckOut;
            dbContext.SaveChanges();
            return Ok(attendance);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var attendance = dbContext.Attendances.Find(id);
            if (attendance is null)
            {
                return NotFound();
            }
            dbContext.Attendances.Remove(attendance);
            dbContext.SaveChanges();
            return Ok("Delete SuccessFully");
        }
    }
}
