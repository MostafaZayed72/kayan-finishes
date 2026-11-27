import { readMultipartFormData } from 'h3'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const config = useRuntimeConfig()
  const cloudName = config.cloudinaryCloudName?.trim()
  const apiKey = config.cloudinaryApiKey?.trim()
  const apiSecret = config.cloudinaryApiSecret?.trim()

  if (!cloudName || !apiKey || !apiSecret) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cloudinary is not configured in .env',
    })
  }

  const parts = await readMultipartFormData(event)
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const filePart = parts.find((p) => p.name === 'file')
  if (!filePart || !filePart.data) {
    throw createError({ statusCode: 400, statusMessage: 'File parameter is missing' })
  }

  const base64Data = filePart.data.toString('base64')
  const mimeType = filePart.type || 'image/jpeg'
  const fileDataUrl = `data:${mimeType};base64,${base64Data}`

  const timestamp = Math.round(Date.now() / 1000)
  const stringToSign = `folder=kayan&timestamp=${timestamp}${apiSecret}`
  const signature = crypto.createHash('sha1').update(stringToSign).digest('hex')

  const formData = new FormData()
  formData.append('file', fileDataUrl)
  formData.append('api_key', apiKey)
  formData.append('timestamp', String(timestamp))
  formData.append('folder', 'kayan')
  formData.append('signature', signature)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  const data = (await response.json()) as any
  if (data.error) {
    throw createError({ statusCode: 500, statusMessage: data.error.message })
  }

  return {
    url: data.secure_url,
  }
})
