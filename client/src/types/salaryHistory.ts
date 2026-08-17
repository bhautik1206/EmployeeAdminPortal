export interface SalaryHistory {
  id: string;
  employeeId: string;
  amount: number;
  effectiveFrom: string;
  reason?: string | null;
  createdAt: string;
}

export interface AddSalaryHistoryDto {
  employeeId: string;
  amount: number;
  effectiveFrom: string;
  reason?: string;
}
