import {
  servicesData,
  projectsData,
  packagesData,
  blogPostsData,
  type ServiceItem,
  type ProjectItem,
  type FinishingPackage,
  type BlogPost,
} from '~/data/finishing'

export interface KayanContentResponse {
  services: ServiceItem[]
  projects: ProjectItem[]
  supervisionTiers: FinishingPackage[]
  blogPosts: BlogPost[]
  fromDatabase: boolean
}

export const useKayanData = () => {
  const { data, refresh, pending } = useAsyncData<KayanContentResponse>(
    'kayan-content',
    () => $fetch('/api/content'),
    {
      default: () => ({
        services: servicesData,
        projects: projectsData,
        supervisionTiers: packagesData,
        blogPosts: blogPostsData,
        fromDatabase: false,
      }),
    }
  )

  const services = computed(() => data.value?.services ?? servicesData)
  const projects = computed(() => data.value?.projects ?? projectsData)
  const supervisionTiers = computed(() => data.value?.supervisionTiers ?? packagesData)
  const blogPosts = computed(() => data.value?.blogPosts ?? blogPostsData)
  const fromDatabase = computed(() => Boolean(data.value?.fromDatabase))

  return {
    services,
    projects,
    supervisionTiers,
    blogPosts,
    fromDatabase,
    refresh,
    pending,
  }
}
