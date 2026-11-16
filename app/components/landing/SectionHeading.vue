<script setup lang="ts">
defineProps<{ title: string, description?: string, inverted?: boolean }>()
</script>

<template>
  <div>
    <h2 :class="['mb-4 text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-extrabold tracking-[-0.025em] text-balance', inverted ? 'text-white' : '']">{{ title }}</h2>
    <p v-if="description || $slots.default" :class="['m-0 text-lg sm:text-[19px]', inverted ? 'text-[#b8ccdd]' : 'text-muted-foreground']">
      <slot>{{ description }}</slot>
    </p>
  </div>
</template>
