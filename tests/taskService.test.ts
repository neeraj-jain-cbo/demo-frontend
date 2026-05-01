import { taskService } from "../src/services/taskService";
import { taskApi } from "../src/api/taskApi";
import { Task } from "../src/types/task";

jest.mock("../src/api/taskApi");

const mockedApi = taskApi as jest.Mocked<typeof taskApi>;

describe("Task Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // fetchTasks
  it("should fetch all tasks", async () => {
    mockedApi.getTasks.mockResolvedValue({
      data: { content: [{ taskId: 1, title: "Test" }] }
    } as any);

    const result = await taskService.fetchTasks();

    expect(mockedApi.getTasks).toHaveBeenCalledTimes(1);
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Test");
  });

  // createTask
  it("should create a task with TODO status", async () => {
    const newTask: Task = {
      title: "New Task",
      description: "Test Desc",
      status: "TODO" // will be overridden
    };

    mockedApi.createTask.mockResolvedValue({} as any);

    await taskService.createTask(newTask);

    expect(mockedApi.createTask).toHaveBeenCalledWith({
      ...newTask,
      status: "TODO" // enforced by service
    });
  });

  // deleteTask
  it("should delete a task by id", async () => {
    mockedApi.deleteTask.mockResolvedValue({} as any);

    await taskService.deleteTask("123");

    expect(mockedApi.deleteTask).toHaveBeenCalledWith("123");
  });

  // updateStatus
  it("should update task status", async () => {
    mockedApi.updateStatus.mockResolvedValue({} as any);

    await taskService.updateStatus("123", "DONE");

    expect(mockedApi.updateStatus).toHaveBeenCalledWith("123", "DONE");
  });

  // getTaskById
  it("should fetch a single task by id", async () => {
    const mockTask = {
      taskId: 1,
      title: "Task 1",
      description: "Desc",
      status: "TODO",
      dueDate: "2026-01-01"
    };

    mockedApi.getTaskById.mockResolvedValue({
      data: mockTask
    } as any);

    const result = await taskService.getTaskById("1");

    expect(mockedApi.getTaskById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockTask);
  });

  it("should throw error when fetchTasks API fails", async () => {
    mockedApi.getTasks.mockRejectedValue(new Error("API failure"));

    await expect(taskService.fetchTasks()).rejects.toThrow("API failure");
  });


  it("should throw error when createTask API fails", async () => {
    mockedApi.createTask.mockRejectedValue(new Error("Create failed"));

    await expect(
        taskService.createTask({
          title: "Test",
          description: "Desc",
          status: "TODO"
        })
    ).rejects.toThrow("Create failed");
  });


  it("should throw error when deleteTask API fails", async () => {
    mockedApi.deleteTask.mockRejectedValue(new Error("Delete failed"));

    await expect(taskService.deleteTask("1")).rejects.toThrow("Delete failed");
  });


  it("should throw error when updateStatus API fails", async () => {
    mockedApi.updateStatus.mockRejectedValue(new Error("Update failed"));

    await expect(
        taskService.updateStatus("1", "DONE")
    ).rejects.toThrow("Update failed");
  });


  it("should throw error when getTaskById API fails", async () => {
    mockedApi.getTaskById.mockRejectedValue(new Error("Not found"));

    await expect(taskService.getTaskById("1")).rejects.toThrow("Not found");
  });

});