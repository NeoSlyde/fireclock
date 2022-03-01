import express from "express";

const app = express();
const port = process.env.PORT || 3200;

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} 🚀`);
});

app.get("/", (req, res) => {
  res.send("Hello Fireclock!");
});
