import { taskApi } from "../api/taskApi";
import { Task } from "../types/task";

export const taskService = {
  async fetchTasks(): Promise<Task[]> {
    const res = await taskApi.getTasks();
    return res.data.content || [];
  },

  async createTask(task: Task) {
    return taskApi.createTask({
      ...task,
      status: task.status || "TODO"
    });
  },

  async deleteTask(id: string) {
    return taskApi.deleteTask(id);
  },

  async updateStatus(id: string, status: string) {
    const res = await taskApi.updateStatus(id, status);
    return res.data;
  },

  async getTaskById(id: string) {
    const res = await taskApi.getTaskById(id);
    return res.data;
  }
};