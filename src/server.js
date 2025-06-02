import { configDotenv } from "dotenv";
import { connectDB } from "./db/connect.js";
import app from "./app.js";

configDotenv();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
   try {
      await connectDB(MONGO_URI);
      if (!PORT) {
         throw new Error("No port found in your .env");
      }
      app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
   } catch (e) {
      console.log(e);
   }
}

start();