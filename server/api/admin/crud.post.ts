type EntityType = 'services' | 'projects' | 'supervision_tiers' | 'blog_posts' | 'leads'

const TABLE_MAP: Record<EntityType, string> = {
  services: 'kayan_services',
  projects: 'kayan_projects',
  supervision_tiers: 'kayan_supervision_tiers',
  blog_posts: 'kayan_blog_posts',
  leads: 'kayan_leads',
}

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const supabase = getSupabaseClient()
  if (!supabase) {
    throw createError({ statusCode: 400, statusMessage: 'Supabase is not configured in .env' })
  }

  const body = await readBody<{
    entity: EntityType
    action: 'list' | 'upsert' | 'delete' | 'update_status'
    payload?: any
    id?: string
  }>(event)

  const table = TABLE_MAP[body?.entity]
  if (!table) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid entity' })
  }

  if (body.action === 'list') {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return { data }
  }

  if (body.action === 'delete') {
    const keyCol = body.entity === 'leads' || body.entity === 'supervision_tiers' ? 'id' : 'slug'
    const { error } = await supabase.from(table).delete().eq(keyCol, body.id)
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return { success: true }
  }

  if (body.action === 'update_status' && body.entity === 'leads') {
    const { error } = await supabase
      .from(table)
      .update({ status: body.payload?.status })
      .eq('id', body.id)
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return { success: true }
  }

  if (body.action === 'upsert') {
    let row = body.payload
    if (body.entity === 'services') row = mapServiceToDb(body.payload, body.payload.sortOrder || 0)
    if (body.entity === 'projects') row = mapProjectToDb(body.payload)
    if (body.entity === 'supervision_tiers') row = mapTierToDb(body.payload, body.payload.sortOrder || 0)
    if (body.entity === 'blog_posts') row = mapBlogToDb(body.payload)

    const { error } = await supabase.from(table).upsert(row)
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return { success: true }
  }

  throw createError({ statusCode: 400, statusMessage: 'Unsupported action' })
})
