import axiosClient from "./axiosClient";
import type { AddLeaveRequestDto, LeaveRequest, LeaveStatus } from "../types/leaveRequest";

export function getAll() {
  return axiosClient.get<LeaveRequest[]>("/leaverequests").then((res) => res.data);
}

export function getForEmployee(employeeId: string) {
  return axiosClient
    .get<LeaveRequest[]>(`/leaverequests/employee/${employeeId}`)
    .then((res) => res.data);
}

export function create(dto: AddLeaveRequestDto) {
  return axiosClient.post<LeaveRequest>("/leaverequests", dto).then((res) => res.data);
}

export function setStatus(id: string, status: LeaveStatus) {
  return axiosClient
    .put<LeaveRequest>(`/leaverequests/${id}/status`, { status })
    .then((res) => res.data);
}

export function remove(id: string) {
  return axiosClient.delete(`/leaverequests/${id}`).then(() => undefined);
}
