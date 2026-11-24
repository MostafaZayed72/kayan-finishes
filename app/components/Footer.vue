<template>
  <footer class="bg-slate-950 text-slate-300 border-t border-white/10 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <!-- Brand -->
        <div class="space-y-4">
          <KayanLogo size="md" class="!text-white [&_.fill-slate-900]:fill-white [&_.fill-slate-600]:fill-slate-300 [&_.stroke-slate-700\/70]:stroke-white/60" />
          <p class="text-sm text-slate-400 leading-relaxed">
            {{ $t('footer.about') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-bold text-base mb-4">{{ $t('footer.quickLinks') }}</h3>
          <ul class="space-y-2.5 text-sm">
            <li><NuxtLink :to="localePath('/services')" class="hover:text-brand-orange transition-colors">{{ $t('nav.services') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/projects')" class="hover:text-brand-orange transition-colors">{{ $t('nav.projects') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/calculator')" class="hover:text-brand-orange transition-colors">{{ $t('nav.calculator') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/blog')" class="hover:text-brand-orange transition-colors">{{ $t('nav.blog') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/about')" class="hover:text-brand-orange transition-colors">{{ $t('nav.about') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/contact')" class="hover:text-brand-orange transition-colors">{{ $t('nav.contact') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Local SEO Areas -->
        <div>
          <h3 class="text-white font-bold text-base mb-4">{{ $t('footer.areasTitle') }}</h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="loc in locationsData" :key="loc.slug">
              <NuxtLink :to="localePath(`/locations/${loc.slug}`)" class="hover:text-brand-orange transition-colors">
                {{ loc.name[locale] }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-bold text-base mb-4">{{ $t('footer.contactTitle') }}</h3>
          <ul class="space-y-3 text-sm text-slate-400">
            <li class="flex items-start gap-2.5">
              <svg class="w-5 h-5 text-brand-orange shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ $t('footer.address') }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <svg class="w-5 h-5 text-brand-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+201000000000" dir="ltr" class="hover:text-white transition-colors">+20 100 000 0000</a>
            </li>
            <li class="flex items-center gap-2.5">
              <svg class="w-5 h-5 text-brand-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:info@kayan-finishes.com" dir="ltr" class="hover:text-white transition-colors">info@kayan-finishes.com</a>
            </li>
            <li class="flex items-center gap-2.5">
              <svg class="w-5 h-5 text-brand-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <a
                href="https://www.instagram.com/kayan.no.1/"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                class="hover:text-white transition-colors"
              >
                @kayan.no.1
              </a>
            </li>
            <li class="flex items-center gap-2.5">
              <svg class="w-5 h-5 text-brand-orange shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <a
                href="https://www.tiktok.com/@kayan.no.1?_r=1&_t=ZG-9Bg4vw5bD7P"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                class="hover:text-white transition-colors"
              >
                TikTok (@kayan.no.1)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>{{ $t('footer.rights') }} — {{ new Date().getFullYear() }}</p>
        <p>KAYAN CONSTRUCTION &amp; FINISHES</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { locationsData } from '~/data/finishing'

const { locale } = useI18n()
const localePath = useLocalePath()
</script>
