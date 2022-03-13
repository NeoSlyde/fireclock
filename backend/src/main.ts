import express, { Express } from "express";
import session from "express-session";

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3200");

app.use(session({ secret: "SECRET", resave: false, cookie: {} }));
app.use(express.json());

import router from "./services/users/users-routage";
app.use("/api", router);

app.use(express.static("../frontend/dist/fireclock-frontend"));

app.get("/", (req, res) => {
  res.send("Hello FireClock!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} 🚀`);
});
