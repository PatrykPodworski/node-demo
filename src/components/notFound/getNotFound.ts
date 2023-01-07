import { RequestHandler } from "express";
import path from "path";

const getNotFound: RequestHandler = (req, res) => {
  res.status(404);
  console.log("accepted", req.accepts("json"));
  switch (true) {
    case !!req.accepts("html"):
      res.sendFile(path.join(__dirname, "notFound.html"));
      break;
    case !!req.accepts("json"):
      res.json({ error: "Page not found." });
      break;
    default:
      res.type("txt").send("Page not found.");
      break;
  }
};

export default getNotFound;
