namespace EmployeeAdminPortal.Models.Entities
{
    public class SalaryHistory
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public decimal Amount { get; set; }
        public DateTime EffectiveFrom { get; set; }
        public string? Reason { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
