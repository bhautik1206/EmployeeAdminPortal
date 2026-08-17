using EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Models
{
    public class UpdateLeaveRequestStatusDto
    {
        public required LeaveStatus Status { get; set; }
    }
}
