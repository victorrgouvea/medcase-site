<script setup lang="ts">
const loginUrl = usePlatformUrl('/entrar')
</script>

<template>
  <footer class="border-t pt-10 pb-12 text-[15px] text-muted-foreground">
    <div class="mx-auto flex max-w-290 flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
      <BrandLogo />
      <a :href="loginUrl" class="underline underline-offset-4 hover:text-primary">Acessar a plataforma</a>
    </div>
  </footer>
</template>
