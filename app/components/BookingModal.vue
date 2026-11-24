<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      @click.self="closeBooking"
    >
      <div class="w-full max-w-lg rounded-3xl bg-white dark:bg-brand-charcoal border border-slate-200 dark:border-white/10 shadow-2xl p-6 md:p-8 relative">
        <button
          type="button"
          @click="closeBooking"
          class="absolute top-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          :class="locale === 'ar' ? 'left-5' : 'right-5'"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div v-if="!submitted">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange mb-3">
            {{ locale === 'ar' ? 'معاينة هندسية مجانية' : 'Free Engineering Inspection' }}
          </span>
          <h3 class="text-2xl font-black mb-2 text-slate-900 dark:text-white">
            {{ locale === 'ar' ? 'احجز موعد معاينة لوحدتك' : 'Book Your Site Inspection' }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {{ locale === 'ar' ? 'سيقوم مهندس متخصص بالتواصل معك خلال ساعتين لتحديد الموعد.' : 'A senior engineer will contact you within 2 hours to confirm.' }}
          </p>

          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                {{ locale === 'ar' ? 'الاسم الكامل' : 'Full Name' }}
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm"
                :placeholder="locale === 'ar' ? 'مثال: محمد أحمد' : 'e.g. Mohamed Ahmed'"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {{ locale === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp' }}
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  dir="ltr"
                  class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm"
                  placeholder="0100 000 0000"
                />
              </div>
              <div>
                <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                  {{ locale === 'ar' ? 'المنطقة / الكمبوند' : 'Location / Compound' }}
                </label>
                <input
                  v-model="form.location"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm"
                  :placeholder="locale === 'ar' ? 'التجمع الخامس / زايد' : 'New Cairo / Zayed'"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                {{ locale === 'ar' ? 'ملاحظات إضافية' : 'Notes' }}
              </label>
              <textarea
                v-model="form.notes"
                rows="3"
                class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm"
                :placeholder="locale === 'ar' ? 'المساحة التقريبية أو نوع الوحدة...' : 'Approximate area or unit type...'"
              />
            </div>

            <button type="submit" class="btn-primary w-full justify-center">
              {{ locale === 'ar' ? 'تأكيد طلب المعاينة' : 'Confirm Inspection Request' }}
            </button>
          </form>
        </div>

        <div v-else class="text-center py-8 space-y-4">
          <div class="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-2xl font-black text-slate-900 dark:text-white">
            {{ locale === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Request Received!' }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {{ locale === 'ar' ? 'شكراً لتواصلك مع كيان. سيتصل بك فريقنا الهندسي قريباً.' : 'Thank you for contacting Kayan. Our engineering team will call you shortly.' }}
          </p>
          <button type="button" @click="resetAndClose" class="btn-outline">
            {{ locale === 'ar' ? 'إغلاق' : 'Close' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { isOpen, prefilledNote, closeBooking } = useBookingModal()

const submitted = ref(false)
const form = reactive({
  name: '',
  phone: '',
  location: '',
  notes: '',
})

watch(prefilledNote, (val) => {
  if (val) form.notes = val
})

const submitForm = () => {
  submitted.value = true
}

const resetAndClose = () => {
  submitted.value = false
  form.name = ''
  form.phone = ''
  form.location = ''
  form.notes = ''
  closeBooking()
}
</script>
