export interface Task {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number; // Tỉ lệ hoàn thành (0-100%)
  assignee?: string;
}
