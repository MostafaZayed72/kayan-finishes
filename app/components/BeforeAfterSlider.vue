<template>
  <div
    ref="containerRef"
    class="relative w-full overflow-hidden rounded-3xl select-none cursor-ew-resize border border-slate-200 dark:border-white/10 shadow-2xl group"
    :class="heightClass"
    dir="ltr"
    @mousedown="startDrag"
    @touchstart.passive="startDrag"
  >
    <!-- After Image (Full Background) -->
    <img
      :src="afterImage"
      :alt="afterLabel"
      class="absolute inset-0 w-full h-full object-cover pointer-events-none"
    />

    <!-- Before Image (Clipped) -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none"
      :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
    >
      <img
        :src="beforeImage"
        :alt="beforeLabel"
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>

    <!-- Labels -->
    <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-white backdrop-blur-md">
      {{ beforeLabel }}
    </span>
    <span class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-brand-orange text-white shadow-lg">
      {{ afterLabel }}
    </span>

    <!-- Divider Line & Handle -->
    <div
      class="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(0,0,0,0.6)] pointer-events-none"
      :style="{ left: `${position}%` }"
    >
      <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-brand-orange text-white border-4 border-white shadow-xl flex items-center justify-center transition-transform group-hover:scale-110">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    beforeImage: string
    afterImage: string
    beforeLabel?: string
    afterLabel?: string
    heightClass?: string
  }>(),
  {
    beforeLabel: 'قبل التشطيب',
    afterLabel: 'بعد التشطيب',
    heightClass: 'h-72 sm:h-96 md:h-[460px]',
  }
)

const containerRef = ref<HTMLElement | null>(null)
const position = ref(50)
const isDragging = ref(false)

const updatePosition = (clientX: number) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const percent = ((clientX - rect.left) / rect.width) * 100
  position.value = Math.min(96, Math.max(4, percent))
}

const onMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  updatePosition(clientX)
}

const stopDrag = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('touchmove', onMove)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  updatePosition(clientX)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('touchmove', onMove, { passive: true })
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchend', stopDrag)
}

onUnmounted(stopDrag)
</script>
