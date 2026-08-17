export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string | null;
  checkOut?: string | null;
}

export interface AddAttendanceDto {
  employeeId: string;
  date: string;
  checkIn?: string;
}

export interface UpdateAttendanceDto {
  checkOut: string;
}
