import axios from "axios";
import { config } from "../config";
import { Task } from "../types/task";

const client = axios.create({ baseURL: config.apiBase });

export const taskApi = {
  getTasks: () => client.get(`/tasks?${(config.tasksPagination as string)}`),
  getTaskById: (id: string) => client.get(`/tasks/${id}`),
  createTask: (task: Task) => client.post("/tasks", task),
  deleteTask: (id: string) => client.delete(`/tasks/${id}`),
  updateStatus: (id: string, status: string) => client.patch(`/tasks/${id}/status?status=${status}`)
};