import { Router } from "express";
import { taskController } from "../controllers/taskController";

const router = Router();

router.get("/", taskController.getHome);
router.get("/tasks/:id", taskController.getTaskDetails);
router.post("/tasks", taskController.createTask);
router.post("/tasks/:id/delete", taskController.deleteTask);
router.post("/tasks/:id/status", taskController.updateStatus);

export default router;