<template>
  <div class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-12" data-aos="fade-up">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange mb-3">
          {{ $t('nav.calculator') }}
        </span>
        <h1 class="section-title">
          {{ locale === 'ar' ? 'حاسبة تكلفة التشطيب التفاعلية' : 'Interactive Finishing Cost Calculator' }}
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          {{ locale === 'ar' ? 'احسب التكلفة التقديرية والمدة الزمنية لتشطيب وحدتك في ثوانٍ.' : 'Estimate the budget and timeline for finishing your unit in seconds.' }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Controls -->
        <div class="lg:col-span-7 premium-card space-y-6" data-aos="fade-up">
          <!-- Unit Type -->
          <div>
            <label class="block text-sm font-bold mb-3">{{ locale === 'ar' ? '1. نوع الوحدة' : '1. Unit Type' }}</label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="u in unitTypes"
                :key="u.id"
                type="button"
                @click="unitType = u.id"
                class="py-3 px-4 rounded-2xl text-sm font-bold border transition-all"
                :class="unitType === u.id ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-orange-600/20' : 'border-slate-200 dark:border-white/10 hover:border-brand-orange'"
              >
                {{ u.label[locale] }}
              </button>
            </div>
          </div>

          <!-- Area Slider -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-bold">{{ locale === 'ar' ? '2. المساحة بالمتر المربع' : '2. Area in Square Meters' }}</label>
              <span class="text-lg font-black text-brand-orange">{{ area }} {{ $t('common.sqm') }}</span>
            </div>
            <input
              v-model.number="area"
              type="range"
              min="70"
              max="600"
              step="5"
              class="w-full accent-[#E8631A] cursor-pointer"
            />
            <div class="flex justify-between text-xs text-slate-400 mt-1">
              <span>70 {{ $t('common.sqm') }}</span>
              <span>600 {{ $t('common.sqm') }}</span>
            </div>
          </div>

          <!-- Supervision Model Selection -->
          <div>
            <label class="block text-sm font-bold mb-3">{{ locale === 'ar' ? '3. نظام الإشراف الهندسي المختار' : '3. Engineering Supervision Model' }}</label>
            <div class="space-y-3">
              <button
                v-for="pkg in packagesData"
                :key="pkg.id"
                type="button"
                @click="selectedPkgId = pkg.id"
                class="w-full text-start p-4 rounded-2xl border transition-all flex items-center justify-between gap-4"
                :class="selectedPkgId === pkg.id ? 'border-brand-orange bg-brand-orange/10' : 'border-slate-200 dark:border-white/10 hover:border-brand-orange/50'"
              >
                <div>
                  <div class="font-extrabold text-sm">{{ pkg.name[locale] }}</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ pkg.desc[locale] }}</div>
                </div>
                <div class="text-end shrink-0">
                  <div class="text-xl font-black text-brand-orange">{{ pkg.percentage }}%</div>
                  <div class="text-[11px] text-slate-400">{{ locale === 'ar' ? 'نسبة الإشراف' : 'Supervision' }}</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-sm font-bold mb-2">{{ locale === 'ar' ? '4. المنطقة' : '4. Location' }}</label>
            <select
              v-model="selectedLocation"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm font-semibold"
            >
              <option v-for="loc in locationsData" :key="loc.slug" :value="loc.name[locale]">
                {{ loc.name[locale] }}
              </option>
            </select>
          </div>
        </div>

        <!-- Live Result Card -->
        <div class="lg:col-span-5 premium-card !bg-brand-charcoal text-white space-y-6 sticky top-24" data-aos="fade-up" data-aos-delay="100">
          <div>
            <span class="text-xs font-bold text-orange-400 uppercase tracking-wider">
              {{ locale === 'ar' ? 'التقدير الشامل (التنفيذ + الإشراف)' : 'Estimated Total (Execution + Supervision)' }}
            </span>
            <div class="text-4xl font-black text-white mt-2">
              {{ totalCost.toLocaleString() }}
              <span class="text-lg text-brand-orange font-bold">{{ $t('common.egp') }}</span>
            </div>
          </div>

          <div class="space-y-3 py-4 border-y border-white/10 text-sm">
            <div class="flex items-center justify-between">
              <span class="text-slate-400">{{ locale === 'ar' ? 'تقدير الخامات والمصنعيات' : 'Est. Materials & Labor' }}</span>
              <span class="font-bold">{{ executionCost.toLocaleString() }} {{ $t('common.egp') }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400">{{ locale === 'ar' ? `نسبة الإشراف الهندسي (${currentPkg.percentage}%)` : `Supervision Fee (${currentPkg.percentage}%)` }}</span>
              <span class="font-bold text-brand-orange">{{ supervisionFee.toLocaleString() }} {{ $t('common.egp') }}</span>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-white/10">
              <span class="text-slate-400">{{ $t('common.duration') }}</span>
              <span class="font-extrabold">{{ estimatedDays }} {{ $t('common.days') }}</span>
            </div>
          </div>

          <p class="text-xs text-slate-400 leading-relaxed">
            {{ locale === 'ar' ? '* هذا التقدير استرشادي بناءً على متوسط أسعار الخامات الحالية. السعر النهائي يتحدد بعد المعاينة الهندسية المجانية.' : '* This is an indicative estimate based on current material rates. Final BOQ is confirmed after free inspection.' }}
          </p>

          <button type="button" @click="bookWithEstimate" class="btn-primary w-full justify-center">
            {{ locale === 'ar' ? 'احجز معاينة بهذا التقدير' : 'Book Inspection With Estimate' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { packagesData, locationsData } from '~/data/finishing'

const { locale } = useI18n()
const route = useRoute()
const { openBooking } = useBookingModal()

const unitType = ref<'apartment' | 'villa' | 'commercial'>('apartment')
const area = ref(180)
const selectedPkgId = ref((route.query.pkg as string) || 'full-supervision')
const selectedLocation = ref(locationsData[0].name[locale.value])

const unitTypes = [
  { id: 'apartment' as const, multiplier: 1, label: { ar: 'شقة', en: 'Apartment' } },
  { id: 'villa' as const, multiplier: 1.1, label: { ar: 'فيلا', en: 'Villa' } },
  { id: 'commercial' as const, multiplier: 1.05, label: { ar: 'إداري/تجاري', en: 'Commercial' } },
]

const currentPkg = computed(() => packagesData.find((p) => p.id === selectedPkgId.value) || packagesData[1])

const executionCost = computed(() => {
  const mult = unitTypes.find((u) => u.id === unitType.value)?.multiplier ?? 1
  return Math.round(area.value * currentPkg.value.pricePerSqm * mult)
})

const supervisionFee = computed(() => {
  return Math.round(executionCost.value * (currentPkg.value.percentage / 100))
})

const totalCost = computed(() => executionCost.value + supervisionFee.value)

const estimatedDays = computed(() => {
  const base = unitType.value === 'villa' ? 95 : 55
  return Math.round(base + area.value * 0.14)
})

const bookWithEstimate = () => {
  const summary =
    locale.value === 'ar'
      ? `حاسبة التكلفة: ${unitType.value} - مساحة ${area.value} م² - ${currentPkg.value.name.ar} - المنطقة: ${selectedLocation.value} - التقدير: ${totalCost.value.toLocaleString()} ج.م`
      : `Estimate: ${unitType.value}, ${area.value}m², ${currentPkg.value.name.en}, Location: ${selectedLocation.value}, Total: ${totalCost.value.toLocaleString()} EGP`
  openBooking(summary)
}
</script>
