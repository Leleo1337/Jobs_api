import express from "express";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import authenticationMiddleware from "./middlewares/authentication.js";
import adminMiddleware from "./middlewares/adminMiddleware.js";
import auth from "./routes/auth.js";
import jobs from "./routes/jobs.js";
import users from "./routes/users.js";

const app = express();

// middleware para ler json no body
app.use(express.json());

// rotas
app.use("/api/v1/auth", auth);
app.use("/api/v1/jobs", authenticationMiddleware, jobs);
app.use("/api/v1/users", authenticationMiddleware, adminMiddleware, users);

// middlewares de erros
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
