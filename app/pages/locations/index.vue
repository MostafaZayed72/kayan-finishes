<template>
  <div class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-12" data-aos="fade-up">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange mb-3">
          {{ $t('nav.locations') }}
        </span>
        <h1 class="section-title">{{ locale === 'ar' ? 'مناطق عمل شركة كيان' : 'Areas We Serve Across Egypt' }}</h1>
        <p class="text-slate-600 dark:text-slate-400">
          {{ locale === 'ar' ? 'تغطية هندسية متكاملة في أهم المدن الجديدة والكمبوندات السكنية.' : 'Full engineering coverage across Egypt’s premier residential & commercial districts.' }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="loc in locationsData"
          :key="loc.slug"
          :to="localePath(`/locations/${loc.slug}`)"
          class="premium-card !p-0 overflow-hidden group"
        >
          <div class="h-44 overflow-hidden relative">
            <img :src="loc.image" :alt="loc.name[locale]" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span class="absolute bottom-3 start-3 px-3 py-1 rounded-full text-xs font-bold bg-brand-orange text-white">
              {{ loc.projectsCount }} {{ locale === 'ar' ? 'مشروع منجز' : 'Projects' }}
            </span>
          </div>
          <div class="p-6">
            <h2 class="text-xl font-black mb-2 group-hover:text-brand-orange transition-colors">{{ loc.name[locale] }}</h2>
            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{{ loc.description[locale] }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { locationsData } from '~/data/finishing'

const { locale } = useI18n()
const localePath = useLocalePath()
</script>
