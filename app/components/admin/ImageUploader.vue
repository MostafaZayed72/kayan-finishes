<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-xs font-bold text-slate-700 dark:text-slate-300">{{ label }}</label>
    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div
        v-if="modelValue"
        class="w-20 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-white/15 shrink-0 bg-slate-100 dark:bg-black/40"
      >
        <img :src="modelValue" alt="Preview" class="w-full h-full object-cover" />
      </div>

      <div class="flex-grow w-full flex gap-2">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          type="text"
          dir="ltr"
          placeholder="https://res.cloudinary.com/..."
          class="flex-grow px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-xs"
        />

        <label
          class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-orange text-white hover:bg-orange-700 cursor-pointer shrink-0 transition-colors"
          :class="{ 'opacity-60 pointer-events-none': uploading }"
        >
          <svg v-if="!uploading" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span>{{ uploading ? (locale === 'ar' ? 'جاري الرفع...' : 'Uploading...') : (locale === 'ar' ? 'رفع صورة' : 'Upload') }}</span>
          <input type="file" accept="image/*" class="hidden" @change="handleFile" />
        </label>
      </div>
    </div>
    <p v-if="errorMsg" class="text-xs text-red-500 font-semibold">{{ errorMsg }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [val: string]
}>()

const { locale } = useI18n()
const uploading = ref(false)
const errorMsg = ref('')

const handleFile = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploading.value = true
  errorMsg.value = ''

  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST',
      body: fd,
    })
    emit('update:modelValue', res.url)
  } catch (err: any) {
    errorMsg.value = err?.data?.statusMessage || err?.message || 'Upload failed'
  } finally {
    uploading.value = false
    input.value = ''
  }
}
</script>
