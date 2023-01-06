import cors from "cors";

const corsMiddleware = () => {
  const whitelist = ["http://localhost:3001", "https://www.google.com"];

  return cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  });
};

export default corsMiddleware;
