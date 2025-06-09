import express from "express";
import cors from "cors";
import helmet from "helmet";
//import xss from "xss-clean";
import limiter from "./middlewares/rateLimiter.js";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import authenticationMiddleware from "./middlewares/authentication.js";
import adminMiddleware from "./middlewares/admin.js";
import auth from "./routes/auth.js";
import jobs from "./routes/jobs.js";
import users from "./routes/users.js";

const app = express();

// middleware para ler json no body
app.use(express.json());

// middleware para permitir varias portas
app.use(cors());

// middlewares para segurança
app.use(helmet());
//app.use(xss());  por algum motivo o xss-clean tá bugado
app.set("trust proxy", 1);
app.use(limiter);

// rotas
app.use("/api/v1/auth", auth);
app.use("/api/v1/jobs", authenticationMiddleware, jobs);
app.use("/api/v1/users", authenticationMiddleware, adminMiddleware, users);

// middlewares de erros
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
