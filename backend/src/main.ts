import express, { Express } from "express";
import session from "express-session";
import userRouter from "./services/users/users-routage";
import taskRouter from "./services/tasks/tasks-routage";
import doneTaskRouter from "./services/done_tasks/done_tasks-routage";

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3200");

app.use(session({ secret: "SECRET", resave: false, cookie: {} }));
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", taskRouter);
//app.use("/api", doneTaskRouter);

app.use(express.static("../frontend/dist/fireclock-frontend"));

app.get("/", (req, res) => {
  res.send("Hello FireClock!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} 🚀`);
});
