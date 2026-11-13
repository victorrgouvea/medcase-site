<script setup lang="ts">
// Horizontal lockup from docs/brand/gestoclin-logo.webp: symbol, divider, two-tone name and tagline.
// `compact` drops the divider and tagline for the header; `inverted` is for dark surfaces.
withDefaults(defineProps<{ compact?: boolean, inverted?: boolean }>(), { compact: false, inverted: false })
</script>

<template>
  <span class="inline-flex items-center" :class="compact ? 'gap-2.5' : 'gap-4'">
    <BrandMark
      :class="compact ? 'size-10' : 'size-14'"
      :style="{ '--mark-gap': inverted ? 'var(--primary-deep)' : 'var(--background)' }"
    />
    <span v-if="!compact" class="h-12 w-px bg-input" aria-hidden="true" />
    <span class="flex flex-col">
      <span
        class="font-display leading-none font-bold tracking-[-0.02em]"
        :class="compact ? 'text-[24px]' : 'text-[30px]'"
      >
        <span :class="inverted ? 'text-white' : 'text-primary'">Gesto</span><span class="text-brand-green">Clin</span>
      </span>
      <span
        v-if="!compact"
        class="mt-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase"
        :class="inverted ? 'text-[#b8ccdd]' : 'text-muted-foreground'"
      >Gestão clínica inteligente</span>
    </span>
  </span>
</template>
