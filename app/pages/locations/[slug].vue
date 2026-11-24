<template>
  <div v-if="locationItem" class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtLink :to="localePath('/locations')" class="inline-flex items-center gap-2 text-sm font-bold text-brand-orange mb-6">
        ← {{ $t('nav.locations') }}
      </NuxtLink>

      <h1 class="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">{{ locationItem.headline[locale] }}</h1>
      <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">{{ locationItem.description[locale] }}</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="premium-card">
          <div class="text-xs text-slate-500">{{ locale === 'ar' ? 'المشاريع المنفذة' : 'Completed Projects' }}</div>
          <div class="text-3xl font-black text-brand-orange mt-1">{{ locationItem.projectsCount }}+</div>
        </div>
        <div class="premium-card">
          <div class="text-xs text-slate-500">{{ locale === 'ar' ? 'متوسط مدة التنفيذ' : 'Avg. Duration' }}</div>
          <div class="text-2xl font-black mt-1">{{ locationItem.avgDuration[locale] }}</div>
        </div>
        <div class="premium-card flex items-center">
          <button type="button" @click="openBooking(locationItem.name[locale])" class="btn-primary w-full justify-center">
            {{ $t('nav.bookVisit') }}
          </button>
        </div>
      </div>

      <div class="premium-card">
        <h2 class="text-xl font-black mb-4">{{ locale === 'ar' ? 'أبرز الكمبوندات التي نخدمها في المنطقة' : 'Top Compounds We Serve' }}</h2>
        <div class="flex flex-wrap gap-2.5">
          <span
            v-for="comp in locationItem.popularCompounds[locale]"
            :key="comp"
            class="px-4 py-2 rounded-full text-sm font-bold bg-brand-orange/10 text-brand-orange border border-brand-orange/25"
          >
            {{ comp }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { locationsData } from '~/data/finishing'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const { openBooking } = useBookingModal()

const locationItem = computed(() => locationsData.find((l) => l.slug === route.params.slug) || locationsData[0])
</script>
