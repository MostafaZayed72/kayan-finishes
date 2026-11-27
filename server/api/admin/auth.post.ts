export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ email?: string; password?: string; action?: string }>(event)

  if (body?.action === 'logout') {
    deleteCookie(event, 'kayan_admin_token')
    return { authenticated: false }
  }

  if (body?.action === 'check') {
    const token = getCookie(event, 'kayan_admin_token')
    return {
      authenticated: verifyAdminToken(token),
      supabaseConfigured: Boolean(getSupabaseClient()),
      cloudinaryConfigured: isCloudinaryConfigured(),
    }
  }

  if (body?.email === config.adminEmail && body?.password === config.adminPassword) {
    const token = createAdminToken()
    setCookie(event, 'kayan_admin_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return {
      authenticated: true,
      supabaseConfigured: Boolean(getSupabaseClient()),
      cloudinaryConfigured: isCloudinaryConfigured(),
    }
  }

  throw createError({ statusCode: 401, statusMessage: 'Incorrect credentials' })
})
