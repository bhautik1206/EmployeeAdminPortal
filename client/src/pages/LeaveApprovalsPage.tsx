import { useEffect, useState } from "react";
import * as leaveRequestsApi from "../api/leaveRequests";
import type { LeaveRequest } from "../types/leaveRequest";

export default function LeaveApprovalsPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  function load() {
    leaveRequestsApi.getAll().then(setRequests);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSetStatus(id: string, status: "Approved" | "Rejected") {
    await leaveRequestsApi.setStatus(id, status);
    load();
  }

  return (
    <div>
      <h2>Leave Approvals</h2>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.employeeId}</td>
              <td>{new Date(r.startDate).toLocaleDateString()}</td>
              <td>{new Date(r.endDate).toLocaleDateString()}</td>
              <td>{r.reason}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "Pending" && (
                  <>
                    <button onClick={() => handleSetStatus(r.id, "Approved")}>Approve</button>
                    <button onClick={() => handleSetStatus(r.id, "Rejected")}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
