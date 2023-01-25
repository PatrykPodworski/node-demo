import mongoose from "mongoose";
import env from "src/env";

const configureDatabase = async () => {
  try {
    await mongoose.connect(env.connectionString);
    mongoose.set("strictQuery", false);
  } catch (err) {
    console.error(err);
  }
};

export default configureDatabase;
