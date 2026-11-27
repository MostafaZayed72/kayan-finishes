import {
  servicesData,
  projectsData,
  packagesData,
  blogPostsData,
} from '~/data/finishing'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const supabase = getSupabaseClient()
  if (!supabase) {
    throw createError({ statusCode: 400, statusMessage: 'Supabase is not configured in .env' })
  }

  const [srv, proj, tiers, blog] = await Promise.all([
    supabase.from('kayan_services').upsert(servicesData.map((s, i) => mapServiceToDb(s, i))),
    supabase.from('kayan_projects').upsert(projectsData.map((p) => mapProjectToDb(p))),
    supabase.from('kayan_supervision_tiers').upsert(packagesData.map((t, i) => mapTierToDb(t, i))),
    supabase.from('kayan_blog_posts').upsert(blogPostsData.map((b) => mapBlogToDb(b))),
  ])

  const firstErr = srv.error || proj.error || tiers.error || blog.error
  if (firstErr) {
    throw createError({ statusCode: 500, statusMessage: firstErr.message })
  }

  return {
    success: true,
    counts: {
      services: servicesData.length,
      projects: projectsData.length,
      supervisionTiers: packagesData.length,
      blogPosts: blogPostsData.length,
    },
  }
})
