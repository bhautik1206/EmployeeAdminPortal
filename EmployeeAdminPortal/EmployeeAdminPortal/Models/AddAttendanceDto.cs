namespace EmployeeAdminPortal.Models
{
    public class AddAttendanceDto
    {
        public Guid EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime? CheckIn { get; set; }
    }
}
