import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  apiBase: process.env.API_BASE || "http://localhost:8080/api",
  tasksPagination: process.env.TASKS_PAGINATION || "page=0&size=10&sort=dueDate,asc"
};