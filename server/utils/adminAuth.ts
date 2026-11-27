import crypto from 'crypto'
import type { H3Event } from 'h3'

function getSecret(): string {
  const config = useRuntimeConfig()
  return `${config.adminEmail}:${config.adminPassword}:kayan-secret`
}

export function createAdminToken(): string {
  const payload = `admin:${Date.now()}`
  const sig = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
  return `${payload}.${sig}`
}

export function verifyAdminToken(token?: string | null): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payload, sig] = parts
  const expected = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
  return sig === expected
}

export function requireAdmin(event: H3Event): void {
  const token = getCookie(event, 'kayan_admin_token') || getHeader(event, 'x-admin-token')
  if (!verifyAdminToken(token)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
