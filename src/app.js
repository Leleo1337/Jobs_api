import express from "express";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import auth from "./routes/auth.js";
import jobs from "./routes/jobs.js";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/jobs", jobs);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;