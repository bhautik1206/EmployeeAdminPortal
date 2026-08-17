using System.Security.Claims;
using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using EmployeeAdminPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly ITokenService tokenService;

        public AuthController(ApplicationDbContext dbContext, ITokenService tokenService)
        {
            this.dbContext = dbContext;
            this.tokenService = tokenService;
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(RegisterUserDto dto)
        {
            if (dbContext.Users.Any(u => u.Email == dto.Email))
            {
                return BadRequest("Email is already registered");
            }

            var role = dbContext.Roles.FirstOrDefault(r => r.Name == dto.Role);
            if (role is null)
            {
                role = new Role { Id = Guid.NewGuid(), Name = dto.Role };
                dbContext.Roles.Add(role);
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                RoleId = role.Id,
                Role = role,
                EmployeeId = dto.EmployeeId,
            };

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            var token = tokenService.CreateToken(user);
            return Ok(new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Email = user.Email,
                Role = role.Name,
            });
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = dbContext.Users.Include(u => u.Role).FirstOrDefault(u => u.Email == dto.Email);
            if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password");
            }

            var token = tokenService.CreateToken(user);
            return Ok(new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Email = user.Email,
                Role = user.Role?.Name ?? "Employee",
            });
        }

        [HttpGet]
        [Route("me")]
        [Authorize]
        public IActionResult Me()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim is null || !Guid.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var user = dbContext.Users.Include(u => u.Role).FirstOrDefault(u => u.Id == userId);
            if (user is null)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                user.Id,
                user.Email,
                Role = user.Role?.Name ?? "Employee",
                user.EmployeeId,
            });
        }
    }
}
