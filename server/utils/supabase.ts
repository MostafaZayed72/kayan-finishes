import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export function getSupabaseClient(): SupabaseClient | null {
  const config = useRuntimeConfig()
  const url = (config.supabaseUrl || '').trim()
  const key = (config.supabaseKey || '').trim()
  if (!url || !key || !url.startsWith('http')) {
    return null
  }
  return createClient(url, key)
}

export function isCloudinaryConfigured(): boolean {
  const config = useRuntimeConfig()
  return Boolean(
    config.cloudinaryCloudName?.trim() &&
      config.cloudinaryApiKey?.trim() &&
      config.cloudinaryApiSecret?.trim()
  )
}
