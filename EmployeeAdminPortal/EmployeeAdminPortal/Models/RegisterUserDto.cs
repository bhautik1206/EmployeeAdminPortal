namespace EmployeeAdminPortal.Models
{
    public class RegisterUserDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string Role { get; set; } = "Employee";
        public Guid? EmployeeId { get; set; }
    }
}
