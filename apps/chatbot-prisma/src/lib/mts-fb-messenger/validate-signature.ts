import { Buffer } from 'node:buffer'
import crypto, { timingSafeEqual } from 'node:crypto'

function s2b(str: string, encoding: BufferEncoding): Buffer {
  return Buffer.from(str, encoding)
}

function safeCompare(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) {
    return false
  }
  return timingSafeEqual(a, b)
}

export default function validateSignature(body: string | Buffer, appSecret: string) {
  return crypto.createHmac('SHA256', appSecret).update(body).digest('hex')
}
