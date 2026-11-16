<script setup lang="ts">
// Browser-window frame for the product illustrations. Everything inside is demo data.
defineProps<{ path: string }>()
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-input bg-card shadow-[0_30px_60px_-36px_rgba(0,43,80,.45)]">
    <div class="flex items-center gap-3 border-b bg-muted px-4 py-2.5">
      <span class="flex gap-1.5" aria-hidden="true">
        <i class="size-2.5 rounded-full bg-input" /><i class="size-2.5 rounded-full bg-input" /><i class="size-2.5 rounded-full bg-input" />
      </span>
      <span class="min-w-0 flex-1 truncate rounded-md bg-card px-3 py-1 text-[13px] text-muted-foreground">app.gestoclin.com{{ path }}</span>
    </div>
    <slot />
  </div>
</template>
