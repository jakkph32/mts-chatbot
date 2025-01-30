import { Router } from "express"
import { json } from "body-parser"
import { verifySignature } from "@/lib/mts-fb-messenger/verify-signature";

const router = Router()

router.use(json({ verify: verifySignature }));

router.get("/webhook", (req, res) => {

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

router.post("/webhook", (req, res) => {
    const body = req.body

    console.log("Received Event")
    console.dir(body, { depth: null })

    res.status(200).send("EVENT_RECEIVED")
})

export { router as FacebookRoutes }