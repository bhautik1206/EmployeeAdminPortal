export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason?: string | null;
  status: LeaveStatus;
  approvedByUserId?: string | null;
  createdAt: string;
}

export interface AddLeaveRequestDto {
  employeeId: string;
  startDate: string;
  endDate: string;
  reason?: string;
}
