import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from "@/config";
import { urlencoded } from "body-parser"
import { stream, logger } from "@/utils/logger"
import { FacebookRoutes } from "./routes/facebook.route";

const app = express();

app.use(morgan(LOG_FORMAT, { stream }))
app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/facebook", FacebookRoutes)

app.listen(PORT, () => {
  logger.info(`==================================`);
  logger.info(`======== ENV: ${NODE_ENV.toUpperCase()} ========`);
  logger.info(`=========== PORT: ${PORT} ===========`);
  logger.info(`==================================`);
});

export default app;
