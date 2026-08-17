import axiosClient from "./axiosClient";
import type { AddEmployeeDto, Employee, UpdateEmployeeDto } from "../types/employee";

export function getAll() {
  return axiosClient.get<Employee[]>("/employees").then((res) => res.data);
}

export function getById(id: string) {
  return axiosClient.get<Employee>(`/employees/${id}`).then((res) => res.data);
}

export function add(dto: AddEmployeeDto) {
  return axiosClient.post<Employee>("/employees", dto).then((res) => res.data);
}

export function update(id: string, dto: UpdateEmployeeDto) {
  return axiosClient.put<Employee>(`/employees/${id}`, dto).then((res) => res.data);
}

export function remove(id: string) {
  return axiosClient.delete(`/employees/${id}`).then(() => undefined);
}
