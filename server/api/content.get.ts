import {
  servicesData,
  projectsData,
  packagesData,
  blogPostsData,
} from '~/data/finishing'

export default defineEventHandler(async () => {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return {
      services: servicesData,
      projects: projectsData,
      supervisionTiers: packagesData,
      blogPosts: blogPostsData,
      fromDatabase: false,
    }
  }

  try {
    const [srvRes, projRes, tierRes, blogRes] = await Promise.all([
      supabase.from('kayan_services').select('*').order('sort_order', { ascending: true }),
      supabase.from('kayan_projects').select('*').order('created_at', { ascending: false }),
      supabase.from('kayan_supervision_tiers').select('*').order('sort_order', { ascending: true }),
      supabase.from('kayan_blog_posts').select('*').order('published_date', { ascending: false }),
    ])

    const hasDbRows =
      (srvRes.data?.length ?? 0) > 0 ||
      (projRes.data?.length ?? 0) > 0 ||
      (tierRes.data?.length ?? 0) > 0 ||
      (blogRes.data?.length ?? 0) > 0

    return {
      services: srvRes.data?.length ? srvRes.data.map(mapServiceFromDb) : servicesData,
      projects: projRes.data?.length ? projRes.data.map(mapProjectFromDb) : projectsData,
      supervisionTiers: tierRes.data?.length ? tierRes.data.map(mapTierFromDb) : packagesData,
      blogPosts: blogRes.data?.length ? blogRes.data.map(mapBlogFromDb) : blogPostsData,
      fromDatabase: hasDbRows,
    }
  } catch (err) {
    console.warn('Supabase read failed, using fallback data:', err)
    return {
      services: servicesData,
      projects: projectsData,
      supervisionTiers: packagesData,
      blogPosts: blogPostsData,
      fromDatabase: false,
    }
  }
})
