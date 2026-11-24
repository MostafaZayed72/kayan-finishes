<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300 border-b"
    :class="[
      isScrolled
        ? 'bg-white/90 dark:bg-brand-black/90 backdrop-blur-xl border-slate-200/80 dark:border-white/10 shadow-lg'
        : 'bg-white/75 dark:bg-brand-black/75 backdrop-blur-md border-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 gap-4">
        <!-- Brand Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center shrink-0 group">
          <KayanLogo size="sm" class="transition-transform duration-300 group-hover:scale-105" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-6 xl:gap-7">
          <NuxtLink :to="localePath('/')" class="nav-link">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink :to="localePath('/services')" class="nav-link">{{ $t('nav.services') }}</NuxtLink>
          <NuxtLink :to="localePath('/projects')" class="nav-link">{{ $t('nav.projects') }}</NuxtLink>
          <NuxtLink :to="localePath('/calculator')" class="nav-link">{{ $t('nav.calculator') }}</NuxtLink>
          <NuxtLink :to="localePath('/blog')" class="nav-link">{{ $t('nav.blog') }}</NuxtLink>
          <NuxtLink :to="localePath('/about')" class="nav-link">{{ $t('nav.about') }}</NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="nav-link">{{ $t('nav.contact') }}</NuxtLink>
        </nav>

        <!-- Actions: Theme, Language, PWA Install, Book CTA -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- PWA Install Button (when available) -->
          <button
            v-if="canInstallPwa"
            type="button"
            @click="installPwa"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-orange-500/10 text-brand-orange border border-brand-orange/30 hover:bg-brand-orange hover:text-white transition-colors"
            :title="$t('common.installApp')"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{{ $t('common.installApp') }}</span>
          </button>

          <!-- Language Switcher -->
          <button
            type="button"
            @click="toggleLanguage"
            class="px-3 py-1.5 rounded-full text-xs font-bold border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            {{ locale === 'ar' ? 'EN' : 'عربي' }}
          </button>

          <!-- Dark/Light Mode Toggle -->
          <button
            type="button"
            @click="toggleDark()"
            class="p-2 rounded-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-brand-orange hover:text-brand-orange transition-colors"
            :aria-label="isDark ? $t('common.lightMode') : $t('common.darkMode')"
          >
            <svg v-if="isDark" class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Primary CTA -->
          <button
            type="button"
            @click="openBooking()"
            class="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-brand-orange text-white hover:bg-orange-700 shadow-md shadow-orange-600/20 transition-all active:scale-95"
          >
            {{ $t('nav.bookVisit') }}
          </button>

          <!-- Mobile Menu Button -->
          <button
            type="button"
            @click="mobileOpen = !mobileOpen"
            class="lg:hidden p-2 rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200"
            aria-label="Toggle Menu"
          >
            <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div
      v-if="mobileOpen"
      class="lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-brand-charcoal px-4 py-4 space-y-2"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="localePath(item.to)"
        @click="mobileOpen = false"
        class="block px-4 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-white/5 hover:text-brand-orange"
      >
        {{ $t(item.label) }}
      </NuxtLink>
      <button
        type="button"
        @click="mobileOpen = false; openBooking()"
        class="w-full mt-2 py-3 rounded-xl font-bold bg-brand-orange text-white"
      >
        {{ $t('nav.bookVisit') }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDark, useToggle, useWindowScroll } from '@vueuse/core'

const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const { openBooking } = useBookingModal()

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  initialValue: 'dark',
})
const toggleDark = useToggle(isDark)

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)

const mobileOpen = ref(false)

const navItems = [
  { to: '/', label: 'nav.home' },
  { to: '/services', label: 'nav.services' },
  { to: '/projects', label: 'nav.projects' },
  { to: '/calculator', label: 'nav.calculator' },
  { to: '/blog', label: 'nav.blog' },
  { to: '/locations', label: 'nav.locations' },
  { to: '/about', label: 'nav.about' },
  { to: '/contact', label: 'nav.contact' },
]

const toggleLanguage = () => {
  setLocale(locale.value === 'ar' ? 'en' : 'ar')
}

// PWA Install Prompt
const deferredPrompt = ref<any>(null)
const canInstallPwa = computed(() => Boolean(deferredPrompt.value))

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
  })
})

const installPwa = async () => {
  if (!deferredPrompt.value) return
  deferredPrompt.value.prompt()
  await deferredPrompt.value.userChoice
  deferredPrompt.value = null
}
</script>
