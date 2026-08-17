import axiosClient from "./axiosClient";
import type { AddAttendanceDto, Attendance, UpdateAttendanceDto } from "../types/attendance";

export function getForEmployee(employeeId: string) {
  return axiosClient
    .get<Attendance[]>(`/attendance/employee/${employeeId}`)
    .then((res) => res.data);
}

export function checkIn(dto: AddAttendanceDto) {
  return axiosClient.post<Attendance>("/attendance", dto).then((res) => res.data);
}

export function checkOut(id: string, dto: UpdateAttendanceDto) {
  return axiosClient.put<Attendance>(`/attendance/${id}`, dto).then((res) => res.data);
}

export function remove(id: string) {
  return axiosClient.delete(`/attendance/${id}`).then(() => undefined);
}
