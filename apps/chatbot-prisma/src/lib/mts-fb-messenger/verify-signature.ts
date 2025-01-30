import * as http from 'node:http'
import { Buffer } from 'node:buffer'
import { JSONParseError, SignatureValidationFailed } from './exceptions'
import * as Types from './types'
import validateSignature from './validate-signature'

export type Request = http.IncomingMessage & { body: any }
export type Response = http.ServerResponse
export type NextCallback = (err?: Error) => void

export type Middleware = (req: Request, res: Response, buff: Buffer) => void | Promise<void>

function isValidBody(body?: any): body is string | Buffer {
  return (body && typeof body === 'string') || Buffer.isBuffer(body)
}

const readRequestBody = async (req: http.IncomingMessage): Promise<Buffer> => {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(chunk as Buffer)
  }
  return Buffer.concat(chunks)
}

export default function verifySignature(config: Types.SignatureConfig): Middleware {
  if (!config.appSecret) {
    throw new Error('No App Secret provided')
  }

  const secret = config.appSecret

  const _middleware: Middleware = async (req, res, next) => {
    // header names are lower-cased
    // https://nodejs.org/api/http.html#http_message_headers
    const signature = req.headers[Types.MESSENGER_SIGNATURE_HTTP_HEADER_NAME] as string

    if (!signature) {
      new SignatureValidationFailed('No App Secret provided')
      return
    }

    const body = await (async (): Promise<string | Buffer> => {
      if (isValidBody((req as any).rawBody)) {
        // rawBody is provided in Google Cloud Functions and others
        return (req as any).rawBody
      } else if (isValidBody(req.body)) {
        return req.body
      } else {
        // body may not be parsed yet, parse it to a buffer
        const rawBody = await readRequestBody(req)
        if (isValidBody(rawBody)) {
          return rawBody
        } else {
          throw new JSONParseError('Invalid body', { raw: rawBody })
        }
      }
    })()

    if (!validateSignature(body, secret)) {
      throw new SignatureValidationFailed('signature validation failed', {
        signature,
      })
    }

    const strBody = Buffer.isBuffer(body) ? body.toString() : body

    try {
      req.body = JSON.parse(strBody)
    } catch (err: any) {
      const { message } = err

      new JSONParseError(message, { raw: strBody })
    }
  }
  return (req, res, buff): void => {
    <Promise<void>>_middleware(req, res, buff)
  }
}
