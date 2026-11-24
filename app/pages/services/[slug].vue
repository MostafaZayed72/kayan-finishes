<template>
  <div v-if="service" class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <NuxtLink :to="localePath('/services')" class="inline-flex items-center gap-2 text-sm font-bold text-brand-orange mb-6">
        ← {{ $t('sections.viewAllServices') }}
      </NuxtLink>

      <div class="rounded-3xl overflow-hidden h-72 md:h-96 mb-8 relative shadow-2xl">
        <img :src="service.image" :alt="service.title[locale]" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div class="absolute bottom-6 start-6 end-6 text-white">
          <div class="flex flex-wrap gap-2 mb-3">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-brand-orange">{{ service.duration[locale] }}</span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">{{ service.warranty[locale] }}</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-black">{{ service.title[locale] }}</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-7 premium-card space-y-6">
          <h2 class="text-xl font-black">{{ locale === 'ar' ? 'تفاصيل الخدمة' : 'Service Overview' }}</h2>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">{{ service.fullDesc[locale] }}</p>

          <h3 class="text-lg font-extrabold pt-2">{{ locale === 'ar' ? 'ما تشمله الخدمة:' : 'Key Deliverables:' }}</h3>
          <ul class="space-y-3">
            <li v-for="item in service.deliverables[locale]" :key="item" class="flex items-start gap-2.5 text-sm">
              <svg class="w-5 h-5 text-brand-orange shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="md:col-span-5 premium-card !bg-brand-charcoal text-white space-y-5 h-fit">
          <h3 class="text-xl font-black">{{ locale === 'ar' ? 'ابدأ تنفيذ مشروعك' : 'Start Your Project' }}</h3>
          <p class="text-sm text-slate-300">{{ locale === 'ar' ? 'احجز معاينة مجانية أو احسب التكلفة التقديرية الآن.' : 'Book a free site visit or calculate your estimated budget.' }}</p>
          <button type="button" @click="openBooking(service.title[locale])" class="btn-primary w-full justify-center">
            {{ $t('nav.bookVisit') }}
          </button>
          <NuxtLink :to="localePath('/calculator')" class="btn-outline !border-white/30 !text-white w-full justify-center">
            {{ $t('nav.calculator') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { servicesData } from '~/data/finishing'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const { openBooking } = useBookingModal()

const service = computed(() => servicesData.find((s) => s.slug === route.params.slug) || servicesData[0])
</script>
