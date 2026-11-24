<template>
  <div class="fixed bottom-5 z-40 flex flex-col gap-3" :class="locale === 'ar' ? 'left-5' : 'right-5'">
    <!-- Scroll to top -->
    <button
      v-if="y > 400"
      type="button"
      @click="scrollToTop"
      class="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white shadow-lg hover:border-brand-orange hover:text-brand-orange flex items-center justify-center transition-all hover:scale-105"
      aria-label="Scroll to top"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>

    <!-- Quick Inspection Modal Trigger -->
    <button
      type="button"
      @click="openBooking()"
      class="w-12 h-12 rounded-full bg-brand-orange text-white shadow-xl shadow-orange-600/30 hover:bg-orange-700 flex items-center justify-center transition-all hover:scale-110"
      :title="$t('nav.bookVisit')"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </button>

    <!-- Instagram Floating Button -->
    <a
      href="https://www.instagram.com/kayan.no.1/"
      target="_blank"
      rel="noopener noreferrer"
      class="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-xl hover:scale-110 flex items-center justify-center transition-all"
      title="Instagram"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    </a>

    <!-- WhatsApp Floating Button -->
    <a
      href="https://wa.me/201000000000"
      target="_blank"
      rel="noopener noreferrer"
      class="w-14 h-14 rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110"
      :title="$t('common.whatsapp')"
    >
      <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.938-.125-.453-.141-1.031-.344-1.766-.656-3.094-1.328-5.109-4.469-5.266-4.672-.156-.203-1.266-1.688-1.266-3.219 0-1.531.797-2.281 1.078-2.594.281-.313.625-.391.828-.391.203 0 .406.016.594.016.188 0 .453-.078.703.531.266.641.891 2.188.969 2.344.078.156.125.344.016.547-.109.203-.156.344-.313.531-.156.188-.328.406-.469.547-.156.156-.328.328-.141.656.188.328.844 1.391 1.813 2.25 1.25 1.109 2.297 1.453 2.625 1.609.328.156.516.141.703-.078.188-.219.813-.953 1.031-1.281.219-.328.438-.266.734-.156.297.109 1.891.891 2.219 1.047.328.156.547.234.625.375.078.141.078.813-.172 1.516z" />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { locale } = useI18n()
const { openBooking } = useBookingModal()
const { y } = useWindowScroll()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
