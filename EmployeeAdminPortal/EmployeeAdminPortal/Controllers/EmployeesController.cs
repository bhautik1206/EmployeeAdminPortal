using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public EmployeesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllEmployee()
        {
            var allEmployees = dbContext.Employees.ToList();
            return Ok(allEmployees);
        }
        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetEmployeeByID(Guid id)
        {
            var employee = dbContext.Employees.Find(id);
            if (employee is null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
        [HttpPost]
        public IActionResult AddEmployee(AddEmployeeDto addEmployeeDto )
        {
            var employeeEntity = new Employee()
            {
                Name = addEmployeeDto.Name,
                Email = addEmployeeDto.Email,
                Phone = addEmployeeDto.Phone,
                Salary = addEmployeeDto.Salary,
            };

            dbContext.Employees.Add(employeeEntity);
            dbContext.SaveChanges();
            return Ok(employeeEntity);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateEmployee(Guid id , UpdateEmployeeDto updatemployeeDto)
        {
            var updatedEmploye = dbContext.Employees.Find(id);
            if (updatedEmploye is null)
            {
                return NotFound();
            }
            updatedEmploye.Name = updatemployeeDto.Name;
            updatedEmploye.Email = updatemployeeDto.Email;
            updatedEmploye.Salary = updatemployeeDto.Salary;
            updatedEmploye.Phone= updatemployeeDto.Phone;

            dbContext.SaveChanges();
            return Ok(updatedEmploye);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteEmployee(Guid id)
        {
            var deleteEmployee = dbContext.Employees.Find(id);
            if(deleteEmployee is null)
            {
                return NotFound();
            }
            dbContext.Employees.Remove(deleteEmployee);
            dbContext.SaveChanges();
            return Ok("Delete SuccessFully");
        }
    }
}
