<script setup lang="ts">
defineProps<{ title: string, description?: string }>()
</script>

<template>
  <div>
    <h2 class="mb-4 text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-extrabold tracking-[-0.025em]">{{ title }}</h2>
    <p v-if="description || $slots.default" class="m-0 text-lg text-muted-foreground sm:text-[19px]">
      <slot>{{ description }}</slot>
    </p>
  </div>
</template>
