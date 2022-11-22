import express from "express";
import path from "path";
import loggerMiddleware from "./middleware/loggerMiddleware";
import corsMiddleware from "./middleware/corsMiddleware";

const app = express();
const PORT = process.env["PORT"] || 3001;

app.use(loggerMiddleware);

app.use(corsMiddleware());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
