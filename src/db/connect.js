import mongoose from "mongoose";

// função para conectar com o banco de dados
export function connectDB(MONGO_URI) {
   return mongoose
      .connect(MONGO_URI)
      .then(() => console.log("connected to db"))
      .catch((e) => console.log(e));
}
