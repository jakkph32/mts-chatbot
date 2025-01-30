import { createHmac } from "crypto"
import { APP_SECRET } from '@/config'


export function verifySignature(req: any, res: any, buff: Buffer) {
  let signature = req.headers["x-hub-signature-256"];
  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = createHmac("sha256", APP_SECRET)
      .update(buff)
      .digest("hex");
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}
