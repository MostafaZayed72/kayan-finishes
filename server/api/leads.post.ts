export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string
    phone?: string
    unit_type?: string
    area_sqm?: number
    location?: string
    estimated_cost?: string
    notes?: string
    source?: string
  }>(event)

  if (!body?.name || !body?.phone) {
    throw createError({ statusCode: 400, statusMessage: 'Name and phone are required' })
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return { success: true, savedToDb: false }
  }

  const { error } = await supabase.from('kayan_leads').insert({
    name: body.name,
    phone: body.phone,
    unit_type: body.unit_type || '',
    area_sqm: Number(body.area_sqm) || 0,
    location: body.location || '',
    estimated_cost: body.estimated_cost || '',
    notes: body.notes || '',
    source: body.source || 'website',
    status: 'new',
  })

  if (error) {
    console.error('Lead insert error:', error)
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { success: true, savedToDb: true }
})
