import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import * as employeesApi from "../api/employees";
import type { Employee } from "../types/employee";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  function loadEmployees() {
    employeesApi.getAll().then(setEmployees);
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await employeesApi.add({ name, email: email || undefined, phone: phone || undefined });
      setName("");
      setEmail("");
      setPhone("");
      loadEmployees();
    } catch {
      setError("Could not add employee");
    }
  }

  async function handleDelete(id: string) {
    await employeesApi.remove(id);
    loadEmployees();
  }

  return (
    <div>
      <h2>Employees</h2>

      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit">Add Employee</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>
                <Link to={`/employees/${emp.id}`}>{emp.name}</Link>
              </td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
