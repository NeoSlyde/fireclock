import express, { Express } from "express";
import router from "./services/users-routage";

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3200");

app.use(express.json());
app.use(express.static("./test"));
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello FireClock!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} 🚀`);
});
