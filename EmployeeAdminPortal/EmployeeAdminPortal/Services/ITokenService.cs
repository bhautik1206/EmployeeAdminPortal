using EmployeeAdminPortal.Models.Entities;

namespace EmployeeAdminPortal.Services
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
