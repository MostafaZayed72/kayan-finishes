<template>
  <div class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-12" data-aos="fade-up">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange mb-3">
          {{ $t('nav.services') }}
        </span>
        <h1 class="section-title">{{ $t('sections.servicesTitle') }}</h1>
        <p class="text-slate-600 dark:text-slate-400">{{ $t('sections.servicesSubtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NuxtLink
          v-for="(service, idx) in servicesData"
          :key="service.slug"
          :to="localePath(`/services/${service.slug}`)"
          class="premium-card !p-0 overflow-hidden group flex flex-col"
          data-aos="fade-up"
          :data-aos-delay="idx * 80"
        >
          <div class="h-60 overflow-hidden relative">
            <img :src="service.image" :alt="service.title[locale]" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div class="absolute bottom-4 start-4 flex gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-orange text-white">{{ service.duration[locale] }}</span>
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-white">{{ service.warranty[locale] }}</span>
            </div>
          </div>
          <div class="p-7 flex-grow flex flex-col justify-between">
            <div>
              <h2 class="text-2xl font-black mb-2 group-hover:text-brand-orange transition-colors">{{ service.title[locale] }}</h2>
              <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{{ service.fullDesc[locale] }}</p>
            </div>
            <span class="text-sm font-bold text-brand-orange">{{ $t('common.viewDetails') }} ←</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { servicesData } from '~/data/finishing'

const { locale } = useI18n()
const localePath = useLocalePath()
</script>
