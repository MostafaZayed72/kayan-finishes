<template>
  <div class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Intro -->
      <div class="max-w-3xl mb-16" data-aos="fade-up">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange mb-4">
          {{ locale === 'ar' ? 'من نحن' : 'About Kayan' }}
        </span>
        <h1 class="section-title">
          {{ locale === 'ar' ? 'هندسة، دقة، والتزام يحوّل كل مساحة إلى واقع مبهر' : 'Engineering Precision Turning Every Space Into Reality' }}
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {{
            locale === 'ar'
              ? 'تأسست شركة كيان للإنشاءات والتشطيبات لتقديم نموذج مختلف في سوق التشطيبات المصري: شفافية كاملة في التكلفة، إشراف هندسي يومي، وخامات معتمدة بضمان حقيقي يصل إلى 10 سنوات.'
              : 'Kayan Construction & Finishes was founded to set a new standard in Egypt: transparent pricing, daily engineering supervision, and certified materials backed by a 10-year warranty.'
          }}
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div v-for="stat in stats" :key="stat.label.en" class="premium-card text-center" data-aos="fade-up">
          <div class="text-3xl md:text-4xl font-black text-brand-orange mb-2">
            <StatCounter :target="stat.value" :suffix="stat.suffix" />
          </div>
          <div class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ stat.label[locale] }}</div>
        </div>
      </div>

      <!-- 4-Step Methodology -->
      <div class="mb-20">
        <h2 class="text-2xl md:text-3xl font-black mb-8 text-slate-900 dark:text-white">
          {{ locale === 'ar' ? 'منهجية العمل في 4 خطوات واضحة' : 'Our 4-Step Execution Methodology' }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(step, i) in stepsList" :key="i" class="premium-card" data-aos="fade-up" :data-aos-delay="i * 80">
            <div class="w-10 h-10 rounded-2xl bg-brand-orange text-white font-black flex items-center justify-center mb-4">
              0{{ i + 1 }}
            </div>
            <h3 class="text-lg font-extrabold mb-2 text-slate-900 dark:text-white">{{ step.title[locale] }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ step.desc[locale] }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="premium-card !bg-brand-charcoal text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-2xl font-black mb-2">{{ locale === 'ar' ? 'هل تود مقابلة فريقنا الهندسي؟' : 'Want to Meet Our Engineering Team?' }}</h3>
          <p class="text-sm text-slate-300">{{ locale === 'ar' ? 'احجز استشارة أو معاينة ميدانية مجانية الآن.' : 'Book a free on-site consultation today.' }}</p>
        </div>
        <button type="button" @click="openBooking()" class="btn-primary shrink-0">
          {{ $t('nav.bookVisit') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { openBooking } = useBookingModal()

const stats = [
  { value: 180, suffix: '+', label: { ar: 'وحدة سكنية وتجارية مُسلّمة', en: 'Delivered Units' } },
  { value: 10, suffix: '', label: { ar: 'سنوات ضمان هندسي شامل', en: 'Years Full Warranty' } },
  { value: 25, suffix: '+', label: { ar: 'مهندس ومشرف تنفيذ', en: 'Engineers & Supervisors' } },
  { value: 100, suffix: '%', label: { ar: 'التزام بالمواصفات والجدول', en: 'Schedule Commitment' } },
]

const stepsList = [
  {
    title: { ar: 'المعاينة والرفع المساحي', en: 'Site Survey & Inspection' },
    desc: { ar: 'زيارة ميدانية لرفع المقاسات بدقة وتحديد متطلباتك وميزانيتك.', en: 'Accurate laser measurements and requirement gathering.' }
  },
  {
    title: { ar: 'التصميم ثلاثي الأبعاد والمقايسة', en: '3D Design & BOQ' },
    desc: { ar: 'تقديم تصميمات واقعية وجدول كميات واضح بدون أي بنود مخفية.', en: 'Photorealistic 3D visuals and itemized cost breakdown.' }
  },
  {
    title: { ar: 'التنفيذ والإشراف اليومي', en: 'Execution & Supervision' },
    desc: { ar: 'تنفيذ مراحل التأسيس والتشطيب مع تقارير أسبوعية مصورة.', en: 'Turnkey execution with weekly photo milestone updates.' }
  },
  {
    title: { ar: 'الاستلام النهائي والضمان', en: 'Handover & Warranty' },
    desc: { ar: 'فحص هندسي شامل لكل بند وتسليم شهادة ضمان لمدة 10 سنوات.', en: 'Final quality checklist and 10-year warranty certificate.' }
  },
]
</script>
