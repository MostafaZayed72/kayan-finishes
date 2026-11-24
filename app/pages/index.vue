<template>
  <div>
    <!-- Hero with Animated Architectural Video -->
    <HeroVideo />

    <!-- Section 1: Core Services -->
    <section class="py-20 bg-brand-cream dark:bg-brand-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12" data-aos="fade-up">
          <div>
            <h2 class="section-title">{{ $t('sections.servicesTitle') }}</h2>
            <p class="text-slate-600 dark:text-slate-400 max-w-2xl">{{ $t('sections.servicesSubtitle') }}</p>
          </div>
          <NuxtLink :to="localePath('/services')" class="btn-outline shrink-0">
            {{ $t('sections.viewAllServices') }}
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="(service, idx) in servicesData"
            :key="service.slug"
            :to="localePath(`/services/${service.slug}`)"
            class="premium-card group flex flex-col overflow-hidden !p-0"
            data-aos="fade-up"
            :data-aos-delay="idx * 80"
          >
            <div class="h-44 overflow-hidden relative">
              <img
                :src="service.image"
                :alt="service.title[locale]"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span class="absolute bottom-3 start-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-orange text-white">
                {{ service.duration[locale] }}
              </span>
            </div>
            <div class="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors mb-2">
                  {{ service.title[locale] }}
                </h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {{ service.shortDesc[locale] }}
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-slate-200/70 dark:border-white/10 text-xs font-bold text-brand-orange flex items-center gap-1">
                <span>{{ $t('common.viewDetails') }}</span>
                <svg class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Section 2: Featured Projects + Interactive Before/After -->
    <section class="py-20 bg-white dark:bg-brand-charcoal border-y border-slate-200/70 dark:border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12" data-aos="fade-up">
          <div>
            <h2 class="section-title">{{ $t('sections.projectsTitle') }}</h2>
            <p class="text-slate-600 dark:text-slate-400 max-w-2xl">{{ $t('sections.projectsSubtitle') }}</p>
          </div>
          <NuxtLink :to="localePath('/projects')" class="btn-outline shrink-0">
            {{ $t('sections.viewAllProjects') }}
          </NuxtLink>
        </div>

        <!-- Interactive Before / After Showcase -->
        <div class="mb-12" data-aos="fade-up">
          <BeforeAfterSlider
            :before-image="featuredProject.beforeImage"
            :after-image="featuredProject.afterImage"
            :before-label="$t('common.before')"
            :after-label="$t('common.after')"
          />
          <div class="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
            <div>
              <strong class="text-slate-900 dark:text-white">{{ featuredProject.title[locale] }}</strong>
              <span class="mx-2">•</span>
              <span>{{ featuredProject.location[locale] }}</span>
            </div>
            <span class="text-xs font-bold text-brand-orange">{{ $t('common.dragCompare') }}</span>
          </div>
        </div>

        <!-- 3 Featured Project Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="(proj, idx) in projectsData.slice(0, 3)"
            :key="proj.slug"
            :to="localePath(`/projects/${proj.slug}`)"
            class="premium-card !p-0 overflow-hidden group"
            data-aos="fade-up"
            :data-aos-delay="idx * 90"
          >
            <div class="h-52 overflow-hidden relative">
              <img
                :src="proj.coverImage"
                :alt="proj.title[locale]"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span class="absolute top-3 start-3 px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-white backdrop-blur-md">
                {{ proj.categoryLabel[locale] }}
              </span>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-brand-orange transition-colors mb-1">
                {{ proj.title[locale] }}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">{{ proj.location[locale] }}</p>
              <div class="flex items-center justify-between text-xs font-bold pt-3 border-t border-slate-200/70 dark:border-white/10">
                <span class="text-slate-700 dark:text-slate-300">{{ proj.area }} {{ $t('common.sqm') }}</span>
                <span class="text-brand-orange">{{ proj.durationDays }} {{ $t('common.days') }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Section 3: Finishing Packages + Calculator CTA -->
    <section class="py-20 bg-brand-cream dark:bg-brand-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12" data-aos="fade-up">
          <h2 class="section-title">{{ $t('sections.packagesTitle') }}</h2>
          <p class="text-slate-600 dark:text-slate-400">{{ $t('sections.packagesSubtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div
            v-for="(pkg, idx) in packagesData"
            :key="pkg.id"
            class="premium-card flex flex-col justify-between relative"
            :class="pkg.popular ? '!border-brand-orange ring-2 ring-brand-orange/30' : ''"
            data-aos="fade-up"
            :data-aos-delay="idx * 90"
          >
            <div>
              <span
                v-if="pkg.badge"
                class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-orange text-white mb-3"
              >
                {{ pkg.badge[locale] }}
              </span>
              <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">{{ pkg.name[locale] }}</h3>
              <div class="flex items-baseline gap-2 mb-3">
                <span class="text-4xl font-black text-brand-orange">{{ pkg.percentage }}%</span>
                <span class="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {{ locale === 'ar' ? 'نسبة الإشراف من التكلفة الفعلية' : 'Supervision Fee of Actual Cost' }}
                </span>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-5">{{ pkg.desc[locale] }}</p>

              <ul class="space-y-2.5 text-sm text-slate-700 dark:text-slate-300 mb-6">
                <li v-for="spec in pkg.specs[locale]" :key="spec" class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-brand-orange shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ spec }}</span>
                </li>
              </ul>
            </div>

            <NuxtLink
              :to="localePath(`/calculator?pkg=${pkg.id}`)"
              :class="pkg.popular ? 'btn-primary w-full' : 'btn-outline w-full'"
            >
              {{ $t('sections.openCalculator') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Simple Conversion CTA -->
    <section class="py-16 bg-gradient-to-r from-brand-black via-zinc-900 to-brand-black text-white border-t border-white/10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-black mb-4">{{ $t('sections.ctaTitle') }}</h2>
        <p class="text-slate-300 max-w-2xl mx-auto mb-8">{{ $t('sections.ctaSubtitle') }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <button type="button" @click="openBooking()" class="btn-primary px-9 py-4 text-base">
            {{ $t('sections.ctaButton') }}
          </button>
          <NuxtLink :to="localePath('/contact')" class="btn-outline !border-white/30 !text-white hover:!border-brand-orange">
            {{ $t('nav.contact') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { servicesData, projectsData, packagesData } from '~/data/finishing'

const { locale } = useI18n()
const localePath = useLocalePath()
const { openBooking } = useBookingModal()

const featuredProject = computed(() => projectsData[0])
</script>
