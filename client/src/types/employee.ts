export interface Employee {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
}

export interface AddEmployeeDto {
  name: string;
  email?: string;
  phone?: string;
}

export type UpdateEmployeeDto = AddEmployeeDto;
