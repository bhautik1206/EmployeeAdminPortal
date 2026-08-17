import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import * as employeesApi from "../api/employees";
import * as salaryHistoryApi from "../api/salaryHistory";
import * as attendanceApi from "../api/attendance";
import * as leaveRequestsApi from "../api/leaveRequests";
import type { Employee } from "../types/employee";
import type { SalaryHistory } from "../types/salaryHistory";
import type { Attendance } from "../types/attendance";
import type { LeaveRequest } from "../types/leaveRequest";

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const employeeId = id!;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [salaryHistory, setSalaryHistory] = useState<SalaryHistory[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  const [salaryAmount, setSalaryAmount] = useState("");
  const [salaryEffectiveFrom, setSalaryEffectiveFrom] = useState("");
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  function loadAll() {
    employeesApi.getById(employeeId).then(setEmployee);
    salaryHistoryApi.getForEmployee(employeeId).then(setSalaryHistory);
    attendanceApi.getForEmployee(employeeId).then(setAttendance);
    leaveRequestsApi.getForEmployee(employeeId).then(setLeaveRequests);
  }

  useEffect(() => {
    loadAll();
  }, [employeeId]);

  async function handleAddSalary(e: FormEvent) {
    e.preventDefault();
    await salaryHistoryApi.add({
      employeeId,
      amount: Number(salaryAmount),
      effectiveFrom: salaryEffectiveFrom,
    });
    setSalaryAmount("");
    setSalaryEffectiveFrom("");
    loadAll();
  }

  async function handleCheckIn() {
    await attendanceApi.checkIn({ employeeId, date: new Date().toISOString() });
    loadAll();
  }

  async function handleCheckOut(attendanceId: string) {
    await attendanceApi.checkOut(attendanceId, { checkOut: new Date().toISOString() });
    loadAll();
  }

  async function handleAddLeaveRequest(e: FormEvent) {
    e.preventDefault();
    await leaveRequestsApi.create({
      employeeId,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: leaveReason || undefined,
    });
    setLeaveStart("");
    setLeaveEnd("");
    setLeaveReason("");
    loadAll();
  }

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{employee.name}</h2>
      <p>
        {employee.email} — {employee.phone}
      </p>

      <section>
        <h3>Salary History</h3>
        <ul>
          {salaryHistory.map((s) => (
            <li key={s.id}>
              {s.amount} effective {new Date(s.effectiveFrom).toLocaleDateString()} {s.reason}
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddSalary}>
          <input
            placeholder="Amount"
            type="number"
            value={salaryAmount}
            onChange={(e) => setSalaryAmount(e.target.value)}
            required
          />
          <input
            type="date"
            value={salaryEffectiveFrom}
            onChange={(e) => setSalaryEffectiveFrom(e.target.value)}
            required
          />
          <button type="submit">Add Salary Entry</button>
        </form>
      </section>

      <section>
        <h3>Attendance</h3>
        <button onClick={handleCheckIn}>Check In Now</button>
        <ul>
          {attendance.map((a) => (
            <li key={a.id}>
              {new Date(a.date).toLocaleDateString()} — In:{" "}
              {a.checkIn ? new Date(a.checkIn).toLocaleTimeString() : "-"} Out:{" "}
              {a.checkOut ? new Date(a.checkOut).toLocaleTimeString() : "-"}
              {!a.checkOut && (
                <button onClick={() => handleCheckOut(a.id)} style={{ marginLeft: "0.5rem" }}>
                  Check Out
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Leave Requests</h3>
        <ul>
          {leaveRequests.map((l) => (
            <li key={l.id}>
              {new Date(l.startDate).toLocaleDateString()} -{" "}
              {new Date(l.endDate).toLocaleDateString()} — {l.status} {l.reason}
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddLeaveRequest}>
          <input
            type="date"
            value={leaveStart}
            onChange={(e) => setLeaveStart(e.target.value)}
            required
          />
          <input
            type="date"
            value={leaveEnd}
            onChange={(e) => setLeaveEnd(e.target.value)}
            required
          />
          <input
            placeholder="Reason"
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
          />
          <button type="submit">Request Leave</button>
        </form>
      </section>
    </div>
  );
}
