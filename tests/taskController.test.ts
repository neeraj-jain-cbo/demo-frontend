import request from "supertest";
import app from "../src/app";
import { taskService } from "../src/services/taskService";

app.set("view engine", "ejs");
app.engine("ejs", (_, options, callback) => {
    return callback(null, JSON.stringify(options));
});

jest.mock("../src/services/taskService");

const mockedService = taskService as jest.Mocked<typeof taskService>;

describe("Task Controller", () => {

    beforeAll(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterAll(() => {
        (console.error as jest.Mock).mockRestore();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // GET /
    it("GET / should render task list", async () => {
        mockedService.fetchTasks.mockResolvedValue([
            { taskId: 1, title: "Test", description: "Desc", status: "TODO" }
        ] as any);

        const res = await request(app).get("/");

        expect(res.status).toBe(200);
        expect(mockedService.fetchTasks).toHaveBeenCalled();
    });

    // GET /tasks/:id
    it("GET /tasks/:id should render task details", async () => {
        mockedService.getTaskById.mockResolvedValue({
            taskId: 1,
            title: "Test",
            description: "Desc",
            status: "TODO"
        } as any);

        const res = await request(app).get("/tasks/1");

        expect(res.status).toBe(200);
        expect(mockedService.getTaskById).toHaveBeenCalledWith("1");
    });

    // POST /tasks
    it("POST /tasks should create task and redirect", async () => {
        mockedService.createTask.mockResolvedValue({} as any);

        const res = await request(app)
            .post("/tasks")
            .send({ title: "Test", description: "Desc" });

        expect(res.status).toBe(302);
        expect(res.header.location).toBe("/");
        expect(mockedService.createTask).toHaveBeenCalled();
    });

    // POST /tasks/:id/status
    it("POST /tasks/:id/status should update status", async () => {
        mockedService.updateStatus.mockResolvedValue({} as any);

        const res = await request(app)
            .post("/tasks/1/status")
            .send({ status: "DONE" });

        expect(res.status).toBe(200);
        expect(mockedService.updateStatus).toHaveBeenCalledWith("1", "DONE");
    });

    // POST /tasks/:id/delete
    it("POST /tasks/:id/delete should delete task", async () => {
        mockedService.deleteTask.mockResolvedValue({} as any);

        const res = await request(app).post("/tasks/1/delete");

        expect(res.status).toBe(302);
        expect(mockedService.deleteTask).toHaveBeenCalledWith("1");
    });

    it("GET / should return 500 on error", async () => {
        mockedService.fetchTasks.mockRejectedValue(new Error("fail"));

        const res = await request(app).get("/");

        expect(res.status).toBe(500);
    });
});