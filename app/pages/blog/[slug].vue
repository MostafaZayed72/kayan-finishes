<template>
  <div v-if="post">
    <!-- Reading Progress Bar -->
    <div class="fixed top-20 inset-x-0 z-40 h-1 bg-slate-200 dark:bg-white/10">
      <div class="h-full bg-brand-orange transition-all duration-150" :style="{ width: `${progress}%` }" />
    </div>

    <article class="py-16 md:py-24">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink :to="localePath('/blog')" class="inline-flex items-center gap-2 text-sm font-bold text-brand-orange mb-6">
          ← {{ $t('nav.blog') }}
        </NuxtLink>

        <span class="block text-xs font-bold text-brand-orange mb-2">{{ post.category[locale] }}</span>
        <h1 class="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">{{ post.title[locale] }}</h1>
        <div class="text-xs text-slate-500 mb-8">{{ post.author[locale] }} • {{ post.date }}</div>

        <img :src="post.coverImage" :alt="post.title[locale]" class="w-full h-72 md:h-96 object-cover rounded-3xl mb-10 shadow-xl" />

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Interactive Table of Contents -->
          <aside class="lg:col-span-4 premium-card !p-5 sticky top-28">
            <h3 class="font-black text-sm mb-3">{{ locale === 'ar' ? 'محتويات المقال' : 'Table of Contents' }}</h3>
            <ul class="space-y-2 text-sm">
              <li v-for="sec in post.sections" :key="sec.id">
                <a :href="`#${sec.id}`" class="text-slate-600 dark:text-slate-300 hover:text-brand-orange transition-colors block py-1">
                  {{ sec.heading[locale] }}
                </a>
              </li>
            </ul>
            <button type="button" @click="openBooking(post.title[locale])" class="btn-primary w-full justify-center mt-6 !py-2.5 text-xs">
              {{ $t('nav.bookVisit') }}
            </button>
          </aside>

          <!-- Article Body -->
          <div class="lg:col-span-8 space-y-8">
            <section v-for="sec in post.sections" :key="sec.id" :id="sec.id" class="premium-card">
              <h2 class="text-xl font-black mb-3 text-slate-900 dark:text-white">{{ sec.heading[locale] }}</h2>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">{{ sec.body[locale] }}</p>
            </section>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { blogPostsData } from '~/data/finishing'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const { openBooking } = useBookingModal()
const { y } = useWindowScroll()

const post = computed(() => blogPostsData.find((p) => p.slug === route.params.slug) || blogPostsData[0])

const progress = computed(() => {
  if (!import.meta.client) return 0
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight <= 0) return 0
  return Math.min(100, Math.max(0, (y.value / docHeight) * 100))
})
</script>
