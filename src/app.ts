import express from "express";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes/taskRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(helmet());

app.use("/", routes);
app.use(errorHandler);

export default app;