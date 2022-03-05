import express, { Express } from "express";

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3200");

const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({
  host: "http://localhost:9200",
  log: "trace",
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} 🚀`);
});

app.get("/", (req, res) => {
  res.send("Hello FireClock!");
});
