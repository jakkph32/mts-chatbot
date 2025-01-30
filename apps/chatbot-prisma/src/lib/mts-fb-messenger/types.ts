export interface SignatureConfig {
  appSecret: string
}

export interface Config {
  accessToken?: string
  appSecret?: string
}

export const MESSENGER_SIGNATURE_HTTP_HEADER_NAME = 'x-hub-signature-256'
