import axiosClient from "./axiosClient";
import type { AddSalaryHistoryDto, SalaryHistory } from "../types/salaryHistory";

export function getForEmployee(employeeId: string) {
  return axiosClient
    .get<SalaryHistory[]>(`/salaryhistory/employee/${employeeId}`)
    .then((res) => res.data);
}

export function getCurrent(employeeId: string) {
  return axiosClient
    .get<SalaryHistory>(`/salaryhistory/employee/${employeeId}/current`)
    .then((res) => res.data)
    .catch(() => null);
}

export function add(dto: AddSalaryHistoryDto) {
  return axiosClient.post<SalaryHistory>("/salaryhistory", dto).then((res) => res.data);
}

export function remove(id: string) {
  return axiosClient.delete(`/salaryhistory/${id}`).then(() => undefined);
}
