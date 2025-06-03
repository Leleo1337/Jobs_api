import { configDotenv } from "dotenv";
import { connectDB } from "./db/connect.js";
import app from "./app.js";

configDotenv();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// função para iniciar o servidor
async function start() {
   try {
      // conecta com o banco de dadoos
      await connectDB(MONGO_URI);

      //se não houver porta no .env, vai dar erro
      if (!PORT) {
         throw new Error("No port found in your .env");
      }

      // vai rodar o servidor
      app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
   } catch (e) {
      console.log(e);
   }
}

start();