<template>
  <div class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-10" data-aos="fade-up">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange mb-3">
          {{ $t('nav.projects') }}
        </span>
        <h1 class="section-title">{{ $t('sections.projectsTitle') }}</h1>
        <p class="text-slate-600 dark:text-slate-400">{{ $t('sections.projectsSubtitle') }}</p>
      </div>

      <!-- Instant Search & Category Filters -->
      <div class="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            @click="selectedCategory = cat.id"
            class="px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all"
            :class="selectedCategory === cat.id ? 'bg-brand-orange text-white shadow-md shadow-orange-600/20' : 'bg-white dark:bg-brand-charcoal border border-slate-200 dark:border-white/10 hover:border-brand-orange'"
          >
            {{ cat.label[locale] }}
          </button>
        </div>

        <input
          v-model="searchQuery"
          type="search"
          :placeholder="locale === 'ar' ? 'ابحث باسم المشروع أو المنطقة...' : 'Search by project or area...'"
          class="px-4 py-2.5 rounded-full bg-white dark:bg-brand-charcoal border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm w-full md:w-72"
        />
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <NuxtLink
          v-for="proj in filteredProjects"
          :key="proj.slug"
          :to="localePath(`/projects/${proj.slug}`)"
          class="premium-card !p-0 overflow-hidden group"
        >
          <div class="h-56 overflow-hidden relative">
            <img :src="proj.coverImage" :alt="proj.title[locale]" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <span class="absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-white backdrop-blur-md">
              {{ proj.categoryLabel[locale] }}
            </span>
          </div>
          <div class="p-6">
            <h2 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors mb-1">
              {{ proj.title[locale] }}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">{{ proj.location[locale] }}</p>
            <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">{{ proj.summary[locale] }}</p>
            <div class="flex items-center justify-between text-xs font-bold pt-3 border-t border-slate-200/70 dark:border-white/10">
              <span>{{ proj.area }} {{ $t('common.sqm') }}</span>
              <span class="text-brand-orange">{{ proj.durationDays }} {{ $t('common.days') }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Interactive Projects Map -->
      <div class="premium-card">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 class="text-xl font-black text-slate-900 dark:text-white">
              {{ locale === 'ar' ? 'خريطة مشاريعنا في مصر' : 'Interactive Project Locations Map' }}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ locale === 'ar' ? 'اضغط على أي نقطة لمعرفة تفاصيل المشروع' : 'Click any pin to preview the project' }}
            </p>
          </div>
          <NuxtLink :to="localePath('/locations')" class="text-xs font-bold text-brand-orange">
            {{ $t('nav.locations') }} ←
          </NuxtLink>
        </div>

        <div class="relative h-72 sm:h-80 rounded-2xl bg-slate-900 overflow-hidden border border-white/10">
          <!-- Architectural Grid Background -->
          <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#E8631A 1px, transparent 1px); background-size: 24px 24px;" />
          <div
            v-for="proj in projectsData"
            :key="proj.slug"
            class="absolute -translate-x-1/2 -translate-y-1/2 group"
            :style="{ left: `${proj.coords.x}%`, top: `${proj.coords.y}%` }"
          >
            <NuxtLink
              :to="localePath(`/projects/${proj.slug}`)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-charcoal/95 border border-brand-orange text-white text-xs font-bold shadow-lg hover:bg-brand-orange transition-all hover:scale-105 whitespace-nowrap"
            >
              <span class="w-2 h-2 rounded-full bg-brand-orange group-hover:bg-white animate-pulse" />
              <span>{{ proj.location[locale].split('،')[0].split(',')[0] }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projectsData } from '~/data/finishing'

const { locale } = useI18n()
const localePath = useLocalePath()

const selectedCategory = ref<'all' | 'apartment' | 'villa' | 'commercial'>('all')
const searchQuery = ref('')

const categories = [
  { id: 'all' as const, label: { ar: 'الكل', en: 'All' } },
  { id: 'apartment' as const, label: { ar: 'شقق ودوبلكس', en: 'Apartments & Duplex' } },
  { id: 'villa' as const, label: { ar: 'فلل وشاليهات', en: 'Villas & Chalets' } },
  { id: 'commercial' as const, label: { ar: 'تجاري وإداري', en: 'Commercial & Offices' } },
]

const filteredProjects = computed(() => {
  return projectsData.filter((p) => {
    const matchesCat = selectedCategory.value === 'all' || p.category === selectedCategory.value
    const q = searchQuery.value.trim().toLowerCase()
    const matchesQuery =
      !q ||
      p.title[locale.value].toLowerCase().includes(q) ||
      p.location[locale.value].toLowerCase().includes(q)
    return matchesCat && matchesQuery
  })
})
</script>
