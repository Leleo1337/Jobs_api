import mongoose from "mongoose";

export function connectDB(MONGO_URI) {
   return mongoose
      .connect(MONGO_URI)
      .then(() => console.log("connected to db"))
      .catch((e) => console.log(e));
}
