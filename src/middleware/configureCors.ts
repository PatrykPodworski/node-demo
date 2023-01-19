import cors from "cors";
import allowedOrigins from "./common/allowedOrigins";

const configureCors = () => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  });
};

export default configureCors;
