import crypto from "crypto"
import { Buffer } from 'node:buffer'
import { APP_SECRET } from '@/config'


export type Signature = (req: Request, res: Response, buff: Buffer) => void | Promise<void>

export function verifySignature() {
  const _signature: Signature = async (req, res, buff) => {
    const signature = req.headers["x-hub-signature-256"];
    if (!signature) {
      console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
    } else {
      var elements = signature.split("=");
      var signatureHash = elements[1];
      var expectedHash = crypto
        .createHmac("sha256", APP_SECRET)
        .update(buff)
        .digest("hex");
      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }
  return _signature
}
