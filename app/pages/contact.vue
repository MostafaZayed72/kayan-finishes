<template>
  <div class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-12" data-aos="fade-up">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange mb-3">
          {{ $t('nav.contact') }}
        </span>
        <h1 class="section-title">
          {{ locale === 'ar' ? 'تواصل معنا واحجز معاينتك' : 'Contact Us & Book Inspection' }}
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          {{ locale === 'ar' ? 'فريقنا الهندسي جاهز للرد على استفساراتك وترتيب معاينة مجانية لوحدتك.' : 'Our engineering team is ready to answer your questions and arrange a free site visit.' }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Contact Form -->
        <div class="lg:col-span-7 premium-card" data-aos="fade-up">
          <div v-if="!sent">
            <h2 class="text-xl font-black mb-6 text-slate-900 dark:text-white">
              {{ locale === 'ar' ? 'أرسل تفاصيل وحدتك' : 'Send Your Unit Details' }}
            </h2>
            <form @submit.prevent="sent = true" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold mb-1.5">{{ locale === 'ar' ? 'الاسم' : 'Name' }}</label>
                  <input v-model="form.name" required type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-bold mb-1.5">{{ locale === 'ar' ? 'رقم الهاتف' : 'Phone' }}</label>
                  <input v-model="form.phone" required type="tel" dir="ltr" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold mb-1.5">{{ locale === 'ar' ? 'نوع الوحدة' : 'Unit Type' }}</label>
                  <select v-model="form.type" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm">
                    <option value="apartment">{{ locale === 'ar' ? 'شقة سكنية' : 'Apartment' }}</option>
                    <option value="villa">{{ locale === 'ar' ? 'فيلا' : 'Villa' }}</option>
                    <option value="commercial">{{ locale === 'ar' ? 'مقر إداري / عيادة' : 'Commercial / Office' }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold mb-1.5">{{ locale === 'ar' ? 'المنطقة' : 'Location' }}</label>
                  <input v-model="form.area" type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm" :placeholder="locale === 'ar' ? 'التجمع الخامس / زايد...' : 'New Cairo / Zayed...'" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold mb-1.5">{{ locale === 'ar' ? 'رسالتك' : 'Message' }}</label>
                <textarea v-model="form.message" rows="4" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm" />
              </div>
              <button type="submit" class="btn-primary w-full sm:w-auto">
                {{ locale === 'ar' ? 'إرسال الطلب' : 'Send Request' }}
              </button>
            </form>
          </div>
          <div v-else class="py-12 text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-2xl font-black">{{ locale === 'ar' ? 'شكراً لتواصلك!' : 'Thank You!' }}</h3>
            <p class="text-sm text-slate-500">{{ locale === 'ar' ? 'تم استلام بياناتك وسيتواصل معك مهندسنا خلال ساعات.' : 'We received your request and will reach out shortly.' }}</p>
            <button type="button" @click="sent = false" class="btn-outline">{{ locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another' }}</button>
          </div>
        </div>

        <!-- Info & Interactive Office Card -->
        <div class="lg:col-span-5 space-y-6" data-aos="fade-up" data-aos-delay="100">
          <div class="premium-card space-y-4">
            <h3 class="text-lg font-black text-slate-900 dark:text-white">{{ $t('footer.contactTitle') }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">{{ $t('footer.address') }}</p>
            <div class="flex flex-wrap gap-3 pt-2">
              <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" class="btn-primary !bg-emerald-600 hover:!bg-emerald-700 !py-2.5 !px-5 text-sm">
                {{ $t('common.whatsapp') }}
              </a>
              <a href="tel:+201000000000" class="btn-outline !py-2.5 !px-5 text-sm">
                {{ $t('common.callUs') }}
              </a>
              <a
                href="https://www.instagram.com/kayan.no.1/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white shadow-md hover:opacity-90 transition-all"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>{{ locale === 'ar' ? 'إنستجرام' : 'Instagram' }}</span>
              </a>
            </div>
          </div>

          <div class="premium-card !p-0 overflow-hidden">
            <div class="p-5 border-b border-slate-200 dark:border-white/10">
              <h3 class="font-black text-sm">{{ locale === 'ar' ? 'مقر شركة كيان — القاهرة الجديدة' : 'Kayan HQ — New Cairo' }}</h3>
            </div>
            <iframe
              title="Kayan Office Map"
              class="w-full h-64 border-0 grayscale dark:invert-[0.9] dark:contrast-125"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=31.42%2C30.00%2C31.52%2C30.05&layer=mapnik"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const sent = ref(false)
const form = reactive({
  name: '',
  phone: '',
  type: 'apartment',
  area: '',
  message: '',
})
</script>
