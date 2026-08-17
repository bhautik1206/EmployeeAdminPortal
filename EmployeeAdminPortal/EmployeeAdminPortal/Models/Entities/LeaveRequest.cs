namespace EmployeeAdminPortal.Models.Entities
{
    public class LeaveRequest
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Reason { get; set; }
        public LeaveStatus Status { get; set; } = LeaveStatus.Pending;
        public Guid? ApprovedByUserId { get; set; }
        public User? ApprovedByUser { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
