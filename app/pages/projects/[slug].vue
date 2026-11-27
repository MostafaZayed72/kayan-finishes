<template>
  <div v-if="project" class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4 mb-6">
        <NuxtLink :to="localePath('/projects')" class="text-sm font-bold text-brand-orange">
          ← {{ $t('sections.viewAllProjects') }}
        </NuxtLink>

        <button
          type="button"
          @click="copyLink"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border border-slate-300 dark:border-white/15 hover:border-brand-orange transition-colors"
        >
          <span>{{ copied ? $t('common.copied') : $t('common.share') }}</span>
        </button>
      </div>

      <h1 class="text-3xl md:text-4xl font-black mb-2 text-slate-900 dark:text-white">{{ project.title[locale] }}</h1>
      <p class="text-slate-500 dark:text-slate-400 mb-8">{{ project.location[locale] }}</p>

      <!-- Before / After Slider -->
      <div class="mb-10">
        <BeforeAfterSlider
          :before-image="project.beforeImage"
          :after-image="project.afterImage"
          :before-label="$t('common.before')"
          :after-label="$t('common.after')"
        />
      </div>

      <!-- Specs Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div class="premium-card !p-4">
          <div class="text-xs text-slate-500">{{ $t('common.area') }}</div>
          <div class="text-lg font-black mt-1">{{ project.area }} {{ $t('common.sqm') }}</div>
        </div>
        <div class="premium-card !p-4">
          <div class="text-xs text-slate-500">{{ $t('common.duration') }}</div>
          <div class="text-lg font-black text-brand-orange mt-1">{{ project.durationDays }} {{ $t('common.days') }}</div>
        </div>
        <div class="premium-card !p-4">
          <div class="text-xs text-slate-500">{{ locale === 'ar' ? 'الباقة' : 'Package' }}</div>
          <div class="text-lg font-black mt-1">{{ project.packageName[locale] }}</div>
        </div>
        <div class="premium-card !p-4">
          <div class="text-xs text-slate-500">{{ locale === 'ar' ? 'الطراز' : 'Style' }}</div>
          <div class="text-lg font-black mt-1">{{ project.style[locale] }}</div>
        </div>
      </div>

      <!-- Summary & Highlights -->
      <div class="premium-card mb-10 space-y-4">
        <h2 class="text-xl font-black">{{ locale === 'ar' ? 'تفاصيل التنفيذ' : 'Project Execution Highlights' }}</h2>
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">{{ project.summary[locale] }}</p>
        <ul class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <li v-for="h in project.highlights[locale]" :key="h" class="flex items-center gap-2 text-sm font-semibold">
            <span class="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
            <span>{{ h }}</span>
          </li>
        </ul>
      </div>

      <!-- Fullscreen Gallery -->
      <div>
        <h2 class="text-xl font-black mb-4">{{ locale === 'ar' ? 'معرض صور المشروع' : 'Project Gallery' }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            v-for="(img, idx) in project.gallery"
            :key="idx"
            type="button"
            @click="lightboxImg = img"
            class="rounded-2xl overflow-hidden h-52 group relative border border-slate-200 dark:border-white/10"
          >
            <img :src="img" :alt="project.title[locale]" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </button>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="lightboxImg"
        class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        @click="lightboxImg = null"
      >
        <img :src="lightboxImg" class="max-w-full max-h-[90vh] rounded-2xl shadow-2xl" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const { projects: projectsData } = useKayanData()

const project = computed(() => projectsData.value.find((p) => p.slug === route.params.slug) || projectsData.value[0])
const lightboxImg = ref<string | null>(null)
const copied = ref(false)

const copyLink = async () => {
  if (!import.meta.client) return
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>
