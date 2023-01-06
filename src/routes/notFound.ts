import express from "express";
import path from "path";
import { appRoot } from "../env";

const notFoundRouter = express.Router();

notFoundRouter.all("*", (req, res) => {
  res.status(404);
  console.log("accepted", req.accepts("json"));
  switch (true) {
    case !!req.accepts("html"):
      res.sendFile(path.join(appRoot, "views", "notFound.html"));
      break;
    case !!req.accepts("json"):
      res.json({ error: "Page not found." });
      break;
    default:
      res.type("txt").send("Page not found.");
      break;
  }
});

export default notFoundRouter;
