import mongoose from "mongoose";
import secret from "./secret-config";

const { MONGODB_URI } = secret;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.info("Database Connected Successfully");
  } catch (error) {
    console.error("Unable to connect to database: ", error);
    process.exit(1); 
  }
}


connectDB();


mongoose.connection.on("connected", () => {
  console.info("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error: ", err);
});

mongoose.connection.on("disconnected", () => {
  console.info("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.info("Mongoose connection closed due to app termination");
  process.exit(0);
});
