<template>
  <div class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12" data-aos="fade-up">
        <div>
          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange mb-3">
            {{ $t('nav.blog') }}
          </span>
          <h1 class="section-title">{{ locale === 'ar' ? 'مدونة كيان للتشطيبات' : 'Kayan Finishing Journal' }}</h1>
          <p class="text-slate-600 dark:text-slate-400">
            {{ locale === 'ar' ? 'مقالات وأدلة هندسية تساعدك على اتخاذ قرارات صحيحة قبل وأثناء التشطيب.' : 'Engineering guides and material comparisons to help you make informed decisions.' }}
          </p>
        </div>

        <input
          v-model="query"
          type="search"
          :placeholder="locale === 'ar' ? 'ابحث في المقالات...' : 'Search articles...'"
          class="px-4 py-2.5 rounded-full bg-white dark:bg-brand-charcoal border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm w-full md:w-72"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="post in filteredPosts"
          :key="post.slug"
          :to="localePath(`/blog/${post.slug}`)"
          class="premium-card !p-0 overflow-hidden group flex flex-col"
        >
          <div class="h-52 overflow-hidden relative">
            <img :src="post.coverImage" :alt="post.title[locale]" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span class="absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold bg-brand-orange text-white">
              {{ post.category[locale] }}
            </span>
          </div>
          <div class="p-6 flex-grow flex flex-col justify-between">
            <div>
              <h2 class="text-lg font-extrabold mb-2 group-hover:text-brand-orange transition-colors">{{ post.title[locale] }}</h2>
              <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">{{ post.excerpt[locale] }}</p>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200/70 dark:border-white/10">
              <span>{{ post.readTime }} {{ locale === 'ar' ? 'دقائق قراءة' : 'min read' }}</span>
              <span class="font-bold text-brand-orange">{{ $t('common.readMore') }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const { blogPosts: blogPostsData } = useKayanData()
const query = ref('')

const filteredPosts = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return blogPostsData.value
  return blogPostsData.value.filter(
    (p) =>
      p.title[locale.value].toLowerCase().includes(q) ||
      p.excerpt[locale.value].toLowerCase().includes(q)
  )
})
</script>
