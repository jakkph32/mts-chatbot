import express from "express";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from "@/config";
import { logger, stream } from "@/utils/logger";

const app = express();

app.use(morgan(LOG_FORMAT, { stream }));
app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  logger.info(`=================================`);
  logger.info(`======= ENV: ${NODE_ENV.toUpperCase()} =======`);
  logger.info(`🚀 App listening on the port ${PORT}`);
  logger.info(`=================================`);
});

export default app;
