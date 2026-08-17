using System.Security.Claims;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/leaverequests")]
    [ApiController]
    public class LeaveRequestsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public LeaveRequestsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        public IActionResult GetAll()
        {
            var requests = dbContext.LeaveRequests.OrderByDescending(l => l.CreatedAt).ToList();
            return Ok(requests);
        }

        [HttpGet]
        [Route("employee/{employeeId:guid}")]
        public IActionResult GetForEmployee(Guid employeeId)
        {
            var requests = dbContext.LeaveRequests
                .Where(l => l.EmployeeId == employeeId)
                .OrderByDescending(l => l.CreatedAt)
                .ToList();
            return Ok(requests);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create(AddLeaveRequestDto dto)
        {
            var employeeExists = dbContext.Employees.Any(e => e.Id == dto.EmployeeId);
            if (!employeeExists)
            {
                return NotFound("Employee not found");
            }

            var leaveRequest = new LeaveRequest
            {
                EmployeeId = dto.EmployeeId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Reason = dto.Reason,
            };

            dbContext.LeaveRequests.Add(leaveRequest);
            dbContext.SaveChanges();
            return Ok(leaveRequest);
        }

        [HttpPut]
        [Route("{id:guid}/status")]
        [Authorize(Roles = "Admin,Manager")]
        public IActionResult SetStatus(Guid id, UpdateLeaveRequestStatusDto dto)
        {
            var leaveRequest = dbContext.LeaveRequests.Find(id);
            if (leaveRequest is null)
            {
                return NotFound();
            }

            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            leaveRequest.Status = dto.Status;
            leaveRequest.ApprovedByUserId = userIdClaim is not null ? Guid.Parse(userIdClaim) : null;

            dbContext.SaveChanges();
            return Ok(leaveRequest);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var leaveRequest = dbContext.LeaveRequests.Find(id);
            if (leaveRequest is null)
            {
                return NotFound();
            }
            dbContext.LeaveRequests.Remove(leaveRequest);
            dbContext.SaveChanges();
            return Ok("Delete SuccessFully");
        }
    }
}
