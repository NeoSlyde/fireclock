import express, { Express } from "express";

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3200");

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} 🚀`);
});

app.get("/", (req, res) => {
  res.send("Hello FireClock!");
});
