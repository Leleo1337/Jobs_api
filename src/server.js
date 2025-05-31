import app from "./app.js";
import { connectDB } from "./db/connect.js";

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

async function start() {
   try {
      await connectDB(DATABASE_URL);
      if (!PORT) {
         throw new Error("No port found in your .env");
      }
      app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
   } catch (e) {
      console.log(e);
   }
}

start();