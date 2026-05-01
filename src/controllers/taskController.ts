import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";

export const taskController = {
  async getHome(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.fetchTasks();
      res.render("index", { tasks });
    } catch (err) {
      next(err);
    }
  },

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, dueDate, status } = req.body;

      // Convert date to ISO OffsetDateTime
      const formattedDueDate = dueDate
          ? new Date(dueDate).toISOString()
          : undefined;

      await taskService.createTask({
        title,
        description,
        status,
        dueDate: formattedDueDate
      });

      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      await taskService.deleteTask(req.params.id);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.updateStatus(req.params.id, req.body.status);
      res.render("taskDetails", { task });
    } catch (err) {
      next(err);
    }
  },

  async getTaskDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      res.render("taskDetails", { task });
    } catch (err) {
      next(err);
    }
  }
};