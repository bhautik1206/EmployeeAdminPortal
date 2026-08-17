namespace EmployeeAdminPortal.Models
{
    public class AddLeaveRequestDto
    {
        public Guid EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Reason { get; set; }
    }
}
