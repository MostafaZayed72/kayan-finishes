<template>
  <span ref="elRef">{{ displayValue }}{{ suffix }}</span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    target: number
    suffix?: string
    duration?: number
  }>(),
  {
    suffix: '',
    duration: 1400,
  }
)

const elRef = ref<HTMLElement | null>(null)
const displayValue = ref(0)
const hasAnimated = ref(false)

const animate = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true
  const start = performance.now()
  const step = (now: number) => {
    const progress = Math.min((now - start) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.round(eased * props.target)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  if (!elRef.value) return
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        animate()
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  observer.observe(elRef.value)
})
</script>
