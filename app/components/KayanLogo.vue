<template>
  <div
    class="inline-flex items-center select-none"
    :class="sizeClasses"
    dir="ltr"
  >
    <svg
      viewBox="0 0 210 155"
      width="128"
      height="90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full overflow-visible"
      aria-label="Kayan Construction & Finishes"
    >
      <!-- Outer & Inner Architectural Roofline -->
      <path
        d="M52 104V58L95 16L134 52V14L174 48V114H74"
        stroke="#E8631A"
        stroke-width="3.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M72 114V60L114 24L154 58V114"
        stroke="#E8631A"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- Bold Brand K -->
      <path
        d="M36 62H53V88L78 62H99L70 91L101 124H79L53 96V124H36V62Z"
        fill="#E8631A"
      />

      <!-- AYAN Text (adapts to light & dark mode) -->
      <text
        x="102"
        y="113"
        font-family="'Montserrat Alternates', 'Inter', Arial, sans-serif"
        font-weight="800"
        font-size="22"
        letter-spacing="1.2"
        class="fill-slate-900 dark:fill-white transition-colors duration-300"
      >
        AYAN
      </text>

      <!-- Divider Line -->
      <line
        x1="34"
        y1="130"
        x2="176"
        y2="130"
        class="stroke-slate-700/70 dark:stroke-white/70 transition-colors duration-300"
        stroke-width="1.3"
      />

      <!-- Subtitle -->
      <text
        x="105"
        y="146"
        text-anchor="middle"
        font-family="'Inter', Arial, sans-serif"
        font-weight="600"
        font-size="10.2"
        letter-spacing="1.4"
        class="fill-slate-600 dark:fill-slate-300 transition-colors duration-300"
      >
        CONSTRUCTION &amp; FINISHES
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { size: 'md' }
)

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-28 h-20'
    case 'lg':
      return 'w-44 h-32'
    default:
      return 'w-32 h-22'
  }
})
</script>
