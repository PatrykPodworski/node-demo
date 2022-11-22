import express from "express";
import path from "path";

const app = express();
const PORT = process.env["PORT"] || 3001;

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
