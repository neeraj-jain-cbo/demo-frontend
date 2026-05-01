export interface Task {
  taskId?: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate?: string;
}