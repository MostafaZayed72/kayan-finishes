<template>
  <section class="relative min-h-[88vh] flex items-center overflow-hidden bg-brand-black text-white">
    <!-- Animated Background Carousel (changes every 3 seconds) -->
    <div class="absolute inset-0">
      <div
        v-for="(slide, idx) in slides"
        :key="slide.url"
        class="absolute inset-0 transition-all duration-1000 ease-in-out"
        :class="currentSlide === idx ? 'opacity-65 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none'"
      >
        <img
          :src="slide.url"
          :alt="slide.alt"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 z-[1] bg-gradient-to-t from-brand-black via-brand-black/65 to-brand-black/40" />
    <div class="absolute inset-0 z-[1] bg-gradient-to-r from-brand-black/80 via-transparent to-brand-black/40" />

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
      <div class="max-w-3xl" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-orange-300 text-xs sm:text-sm font-bold mb-6 backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span>{{ $t('hero.badge') }}</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.35] mb-6 tracking-tight">
          {{ $t('hero.title') }}
          <span class="block text-gradient-orange mt-2 pb-2 leading-[1.35]">{{ $t('hero.titleHighlight') }}</span>
        </h1>

        <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
          {{ $t('hero.subtitle') }}
        </p>

        <div class="flex flex-wrap items-center gap-4 mb-14">
          <NuxtLink :to="localePath('/calculator')" class="btn-primary text-base px-8 py-4">
            <span>{{ $t('hero.ctaPrimary') }}</span>
            <svg class="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>

          <NuxtLink
            :to="localePath('/projects')"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 border-white/30 text-white hover:border-brand-orange hover:bg-brand-orange/15 transition-all"
          >
            <span>{{ $t('hero.ctaSecondary') }}</span>
          </NuxtLink>
        </div>

        <!-- Compact Trust Stats -->
        <div class="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/15 max-w-xl">
          <div>
            <div class="text-2xl sm:text-4xl font-black text-brand-orange">
              <StatCounter :target="180" suffix="+" />
            </div>
            <div class="text-xs sm:text-sm text-slate-300 mt-1">{{ $t('hero.stats.projects') }}</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-white">
              <StatCounter :target="10" />
            </div>
            <div class="text-xs sm:text-sm text-slate-300 mt-1">{{ $t('hero.stats.warranty') }}</div>
          </div>
          <div>
            <div class="text-2xl sm:text-4xl font-black text-brand-orange">
              <StatCounter :target="100" suffix="%" />
            </div>
            <div class="text-xs sm:text-sm text-slate-300 mt-1">{{ $t('hero.stats.commitment') }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Carousel Slide Indicators -->
    <div class="absolute bottom-6 inset-x-0 z-10 flex justify-center gap-2.5">
      <button
        v-for="(slide, idx) in slides"
        :key="slide.url"
        type="button"
        @click="goToSlide(idx)"
        class="h-2 rounded-full transition-all duration-300"
        :class="currentSlide === idx ? 'w-8 bg-brand-orange' : 'w-2.5 bg-white/40 hover:bg-white/70'"
        :aria-label="`Slide ${idx + 1}`"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    alt: 'Modern Luxury Villa Architecture',
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
    alt: 'Contemporary Living Room Interior',
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=85',
    alt: 'Bespoke Apartment Finishing',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85',
    alt: 'Warm Modern Architectural Interior',
  },
]

const currentSlide = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const startTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 3000)
}

const goToSlide = (idx: number) => {
  currentSlide.value = idx
  startTimer()
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
