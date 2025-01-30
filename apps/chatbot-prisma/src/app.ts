import express from "express";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from "@/config";
import { json, urlencoded } from "body-parser"
import { stream, logger } from "@/utils/logger"
import { verifySignature } from "@/lib/mts-fb-messenger/verify-signature"

const app = express();

app.use(morgan(LOG_FORMAT, { stream }))
app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(urlencoded({ extended: true }));
app.use(json({ verify: verifySignature }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/facebook/webhook", (req, res) => {

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === "verify_token") {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
})
app.post("/api/facebook/webhook", (req, res) => {
  const body = req.body

  console.log("Received Event")
  console.dir(body, { depth: null })

  res.status(200).send("EVENT_RECEIVED")
})

app.listen(PORT, () => {
  logger.info(`==================================`);
  logger.info(`======== ENV: ${NODE_ENV.toUpperCase()} ========`);
  logger.info(`=========== PORT: ${PORT} ===========`);
  logger.info(`==================================`);
});

export default app;
