<script setup lang="ts">
const loginUrl = usePlatformUrl('/entrar')
</script>

<template>
  <header class="mx-auto flex h-19 max-w-290 items-center justify-between px-4 sm:px-6">
    <a href="#" class="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight no-underline" aria-label="MedCase, início">
      <BrandMark class="size-8 text-primary" />
      MedCase
    </a>
    <nav aria-label="Principal" class="flex items-center gap-7">
      <a href="#recursos" class="hidden font-medium text-muted-foreground hover:text-foreground sm:inline">Recursos</a>
      <a href="#acessos" class="hidden font-medium text-muted-foreground hover:text-foreground sm:inline">Quem vê o quê</a>
      <Button as="a" :href="loginUrl" class="h-11 px-5">Entrar</Button>
    </nav>
  </header>
</template>
