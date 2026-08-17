namespace EmployeeAdminPortal.Models
{
    public class AddSalaryHistoryDto
    {
        public Guid EmployeeId { get; set; }
        public decimal Amount { get; set; }
        public DateTime EffectiveFrom { get; set; }
        public string? Reason { get; set; }
    }
}
